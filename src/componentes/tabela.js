// import { ContainerTabela } from '../App.css';
import "../App.css"

function Tabela({ vetor, selecionarProduto}) {
  return (
    <div className="ContainerTabela">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Marca</th>
            <th>Selecionar</th>
          </tr>
        </thead>

        <tbody>
          {vetor.map((obj, indice) => (
            <tr key={indice}>
              <td>{obj.codigo}</td>
              <td>{obj.nome}</td>
              <td>{obj.marca}</td>
              <td>
                <button onClick={() => selecionarProduto(indice)} className="btn btn-success">Selecionar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tabela;
