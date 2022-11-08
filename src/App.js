import { useEffect, useState } from "react";
import "./App.css";
import Formulario from "./componentes/Formulario";
import Tabela from "./componentes/Tabela";

function App() {
  const produto = {
    codigo: 0,
    nome: "",
    marca: "",
  };
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);
  const [render, setRender] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then((retorno) => retorno.json())
      .then((retorno_json) => setProdutos(retorno_json));
  }, [render, btnCadastrar]);

  // Obtendo os dados do formulário
  const aoDigitar = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
  };

  // Cadastrar produto
  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar", {
      method: "post",
      body: JSON.stringify(objProduto),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
    .then((retorno) => retorno.json())
    .then((retorno_json) => {
        if (retorno_json.mensagem !== undefined) {
          alert(retorno_json.mensagem);
        } else {
          alert("Produto cadastrado com sucesso");
          limparFormulario();
          setRender(!render);
        }});
    
  };

  // Limpar formulário
  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  };

  // Selectionar Produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  };

  // Remover Produto
  const removerProduto = (codigo) => {
    fetch(`http://localhost:8080/remover/${codigo}`,{
      method: "delete",
    })
    .then(() => { limparFormulario();
          setBtnCadastrar(true);
          setRender(!render);
          alert("Produto removido com sucesso");
    });
  }

  // Botão de cancelar
  const cancelar = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  // Botão de atualizar
  const atualizar = () => {
    fetch(`http://localhost:8080/alterar`, {
      method: "put",
      body: JSON.stringify(objProduto),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
    .then((retorno) => retorno.json())
    .then((retorno_json) => {
        if (retorno_json.mensagem !== undefined) {
          alert(retorno_json.mensagem);
        } else {
          alert("Produto atualizado com sucesso");
          limparFormulario();
          setBtnCadastrar(true)
    }});
  }

  // Retorno
  return (
    <div>
      <p>{JSON.stringify(objProduto)}</p>
      <Formulario
        botao={btnCadastrar}
        eventoTeclado={aoDigitar}
        cadastrar={cadastrar}
        objProduto={objProduto}
        removerProduto={removerProduto}
        cancelar={cancelar}
        atualizarProduto={atualizar}
      />
      <Tabela vetor={produtos} selecionarProduto={selecionarProduto} />
    </div>
  );
}

export default App;
