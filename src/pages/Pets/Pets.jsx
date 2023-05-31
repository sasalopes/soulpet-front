import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";
import { Pagination } from "../../components/Pagination/Pagination";

export function Pets() {
  const [pets, setPets] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [show, setShow] = useState(false);
  const [idPet, setIdPet] = useState(null);
  const limit = 5; // define o número máximo de itens por página

  const handleClose = () => {
    setIdPet(null);
    setShow(false);
  };
  const handleShow = (id) => {
    setIdPet(id);
    setShow(true);
  };

  useEffect(() => {
    initializeTable();
  }, [currentPage]);

  function initializeTable() {
    axios
      .get(`http://localhost:3001/pets?page=${currentPage}&limit=${limit}`)
      .then((response) => {
        setPets(response.data.listaPets);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function onDelete() {
    axios
      .delete(`http://localhost:3001/pets/${idPet}`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        initializeTable();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
    handleClose();
  }

  return (
    <div className="clientes container">
      <div className="d-flex justify-content-between align-items-center m-4">
        <h1>Pets</h1>
        <Button variant="light" as={Link} to="/pets/novo">
          <i className="bi bi-plus-lg me-2"></i> Pet
        </Button>
      </div>
      {pets === null ? (
        <Loader />
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Porte</th>
                <th>Data de Nascimento</th>
                <th>ID Dono</th>
                <th className="d-flex justify-content-center align-items-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => {
                return (
                  <tr key={pet.id}>
                    <td className="align-middle text-wrap">{pet.nome}</td>
                    <td className="align-middle text-wrap">{pet.tipo}</td>
                    <td className="align-middle text-wrap">{pet.porte}</td>
                    <td className="align-middle text-wrap">{pet.dataNasc}</td>
                    <td className="align-middle text-wrap">{pet.clienteId}</td>
                    <td className="d-flex justify-content-center align-items-center gap-2 align-middle text-wrap">
                      <Button
                        variant="danger"
                        onClick={() => handleShow(pet.id)}
                        data-toggle="tooltip"
                        title="Deletar pet"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                      <Button
                        variant="danger"
                        as={Link}
                        to={`/pets/editar/${pet.id}`}
                        data-toggle="tooltip"
                        title="Atualizar pet"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                      <Button
                        variant="danger"
                        as={Link}
                        to={`/pets/detalhes/${pet.id}`}
                        data-toggle="tooltip"
                        title="Informações sobre o pet"
                      >
                        <i className="bi bi-info-square text-warning"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination                    
            total={totalPages}
            currentPage={currentPage}
            onChangePage={handlePageChange} 
            className="pagination"            
          />

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmação</Modal.Title>
            </Modal.Header>
            <Modal.Body>Tem certeza que deseja excluir o pet?</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={onDelete}>
                Excluir
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}
