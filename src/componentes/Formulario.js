function Formulario({
  botao,
  eventoTeclado,
  cadastrar,
  objProduto,
  removerProduto,
  cancelar,
  atualizarProduto
}) {
  return (
    <form>
      <input
        type="text"
        value={objProduto.nome}
        onChange={eventoTeclado}
        name="nome"
        placeholder="Nome"
        className="form-control"
      />
      <input
        type="text"
        value={objProduto.marca}
        onChange={eventoTeclado}
        name="marca"
        placeholder="Marca"
        className="form-control"
      />

      {botao ? (
        <input
          type="button"
          value="Cadastrar"
          onClick={cadastrar}
          className="btn btn-primary"
        />
      ) : (
        <div>
          <input type="button" onClick={atualizarProduto} value="Altualizar produto" className="btn btn-warning" />
          <input
            type="button"
            onClick={() => removerProduto(objProduto.codigo)}
            value="Remover"
            className="btn btn-danger"
          />
          <input type="button" onClick={cancelar} value="Cancelar" className="btn btn-secondary" />
        </div>
      )}
    </form>
  );
}

export default Formulario;
