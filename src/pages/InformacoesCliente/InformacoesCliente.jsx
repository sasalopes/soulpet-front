import axios from "axios";
import { useEffect, useState } from "react";
import { Card, ListGroup, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

export function InformacoesCliente() {
  const [cliente, setCliente] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get(`http://localhost:3001/clientes/${id}`, {
        params: {
          include: ["endereco", "pets"],
        },
      })
      .then((response) => {
        const { nome, email, telefone, endereco, pets } = response.data;
        setCliente({ nome, email, telefone, endereco, pets });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Card style={{ width: "35rem" }} className="mx-auto my-5">
      <Card.Header className="text-center"><h3>Informações do cliente</h3></Card.Header>
      {cliente !== null && (
        <ListGroup variant="primary">
          <ListGroup.Item className="py-3">Nome: {cliente.nome}</ListGroup.Item>
          <ListGroup.Item className="py-3">Email: {cliente.email}</ListGroup.Item>
          <ListGroup.Item className="py-3">Telefone: {cliente.telefone}</ListGroup.Item>
          <ListGroup.Item className="py-3">
            Endereço: <br/><br/> Rua: {cliente.endereco.rua}, Número: {cliente.endereco.numero}, Cidade: {cliente.endereco.cidade}, UF: {cliente.endereco.uf}, CEP: {cliente.endereco.cep}
          </ListGroup.Item>
          <ListGroup.Item className="py-3">
            Pets:
            <br/><br/>
            {(() => {
              const petNames = [];
              cliente.pets.forEach((pet) => {
                petNames.push(<p key={pet.id}>{pet.nome}</p>);
              });
              return petNames;
            })()}
          </ListGroup.Item>
        </ListGroup>
      )}
    </Card>
  );
}

//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Nome</th>
//           <th>E-mail</th>
//           <th>Telefone</th>
//           <th>UF</th>
//           <th>Cidade</th>
//           <th>CEP</th>
//           <th>Rua</th>
//           <th>Número</th>
//           <th>Pets</th>
//         </tr>
//       </thead>
//       <tbody>
//         {cliente !== null && (
//           <tr key={cliente.id}>
//             <td>{cliente.nome}</td>
//             <td>{cliente.email}</td>
//             <td>{cliente.telefone}</td>
//             <td>{cliente.endereco.uf}</td>
//             <td>{cliente.endereco.cidade}</td>
//             <td>{cliente.endereco.cep}</td>
//             <td>{cliente.endereco.rua}</td>
//             <td>{cliente.endereco.numero}</td>
//             <td>
//               {(() => {
//                 const petNames = [];
//                 cliente.pets.forEach((pet) => {
//                   petNames.push(<p key={pet.id}>{pet.nome}</p>);
//                 });
//                 return petNames;
//               })()}
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </Table>
//   );
// }
