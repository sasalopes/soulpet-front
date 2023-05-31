import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader } from "../../components/Loader/Loader";


const baseUrl = "http://localhost:3001";

export function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [show, setShow] = useState(false);
  const [idPedido, setIdPedido] = useState(null);
  const [clienteFiltro, setClienteFiltro] = useState("");
  const [produtoFiltro, setProdutoFiltro] = useState("");
  const [clienteNome, setClienteNome] = useState({});
  const [produtoNome, setProdutoNome] = useState({});

  const handleClose = () => {
    setIdPedido(null);
    setShow(false);
  };

  const handleShow = (id) => {
    setIdPedido(id);
    setShow(true);
  };

  const onDelete = () => {
    axios
      .delete(`${baseUrl}/pedidos/${idPedido}`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        setPedidos(pedidos.filter((pedido) => pedido.id !== idPedido));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
    handleClose();
  };

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get(`${baseUrl}/pedidos`)
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const filtrarPedidos = (pedido) => {
    const cliente = clienteNome[pedido.clienteId]
      ? clienteNome[pedido.clienteId].toLowerCase()
      : "";
    const produto = produtoNome[pedido.produtoId]
      ? produtoNome[pedido.produtoId].toLowerCase()
      : "";
    return (
      cliente.includes(clienteFiltro.toLowerCase()) &&
      produto.includes(produtoFiltro.toLowerCase())
    );
  };

  const handleDeletarPedido = (id) => {
    const novosPedidos = pedidos.filter((pedido) => pedido.id !== id);
    setPedidos(novosPedidos);
  };

  useEffect(() => {
    if (
      pedidos &&
      Object.keys(clienteNome).length !== pedidos.length &&
      Object.keys(produtoNome).length !== pedidos.length
    ) {
      const promises = [];
      pedidos.forEach((pedido) => {
        const nomeCliente = axios
          .get(`${baseUrl}/clientes/${pedido.clienteId}`)
          .then((response) => {
            const cliente = response.data;
            setClienteNome((nomeAnteriorCliente) => {
              return {
                ...nomeAnteriorCliente,
                [pedido.clienteId]: cliente.nome,
              };
            });
          })
          .catch((error) => {
            console.log(error);
          });
        const nomeProduto = axios
          .get(`${baseUrl}/produtos/${pedido.produtoId}`)
          .then((response) => {
            const produto = response.data;
            setProdutoNome((nomeAnteriorProduto) => {
              return {
                ...nomeAnteriorProduto,
                [pedido.produtoId]: produto.nome,
              };
            });
          })
          .catch((error) => {
            console.log(error);
          });
        promises.push(nomeCliente);
        promises.push(nomeProduto);
      });
      Promise.all(promises).then(() => {
        console.log("Clientes e Produtos carregados com sucesso.");
      });
    }
  }, [pedidos, clienteNome, produtoNome]);

  return (
    <div className="produtos container">
      <div className="d-flex justify-content-between align-items-center m-4">
        <h1>Pedidos</h1>
        <Button variant="light" as={Link} to="/pedidos/novo">
          <i className="bi bi-plus-lg me-2"></i> Adicionar novo pedido
        </Button>
      </div>
      <div className="d-flex justify-content-center m-3 p-2">
        <div className="input-group mb-3 w-50 me-3">
          <input
            className="form-control"
            type="text"
            placeholder="Digite o nome do cliente..."
            value={clienteFiltro}
            onChange={(event) => setClienteFiltro(event.target.value)}
          />
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
          </div>
        </div>

        <div className="input-group mb-3 w-50">
          <input
            className="form-control"
            type="text"
            placeholder="Digite o nome do produto..."
            value={produtoFiltro}
            onChange={(event) => setProdutoFiltro(event.target.value)}
          />
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
          </div>
        </div>
      </div>
      {pedidos === null ? (
        <Loader />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Quantidade</th>
              <th>Cliente</th>
              <th>Produto</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.filter(filtrarPedidos).map((pedido) => {
              return (
                <tr key={pedido.id}>
                  <td className="align-middle text-wrap">{pedido.quantidade}</td>
                  <td className="align-middle text-wrap">{clienteNome[pedido.clienteId]}</td>
                  <td className="align-middle text-wrap">{produtoNome[pedido.produtoId]}</td>
                  <td className="d-flex gap-2 align-middle text-wrap">
                    <Button
                      variant="danger"
                      onClick={() => handleDeletarPedido(pedido.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>

                    <Button
                      variant="primary"
                      as={Link}
                      to={`/pedidos/editar/${pedido.id}`}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </Button>

                    <Button
                      variant="info"
                      as={Link}
                      to={`/pedidos/detalhes/${pedido.id}`}
                    >
                      <i className="bi bi-info-circle-fill"></i>
                    </Button>

                    <Button
                      className="m-2"
                      onClick={() => handleShow(pedido.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirmar exclusão do pedido?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}