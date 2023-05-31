import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Table, Button, Modal} from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";
export function Servicos(){

    const [servicos, setServicos] = useState(null);
    const [show, setShow] = useState(false);
    const [idServico, setIdServico] = useState(null);

    useEffect(() =>{
        initializeTable();
    },[])

    const handleClose = () => {
        setIdServico(null);
        setShow(false);
      };
      const handleShow = (id) => {
        setIdServico(id);
        setShow(true);
      };

    function onDelete(){
      axios.delete(`http://localhost:3001/servicos/${idServico}`)
      .then(res =>{
        toast.success("Serviço deletado", {duration:2500, position:"bottom-right"});
        initializeTable();
      })
      .catch(err =>{
        toast.error("Um erro ocorreu", {duration:2000, position:"bottom-right"});
      });
      handleClose();
    };
    function initializeTable(){
        axios.get("http://localhost:3001/servicos")
        .then((res)=>{
            setServicos(res.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }
    return (
    <div className="container ">
      <div className="d-flex justify-content-between mt-4">
      <h1>Serviços</h1>
      
        <Button variant="light" as={Link} to="/clientes/novo" className="m-2">
                        <i className="bi bi-plus-lg me-1"></i> Serviço
             </Button>
        </div>
        {servicos === null ? (<Loader/>) :
        (
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {servicos.map((servico) =>{
            return (
                <tr key={servico.id} >
                    <td>{servico.nome}</td>
                    <td>{servico.preco}</td>
                    <td className="d-flex gap-2 m-t-auto">
                      <Button onClick={() => handleShow(servico.id)} data-toggle="tooltip" title="Deletar serviço">
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                      <Button as={Link} to={`/servicos/editar/${servico.id}`} data-toggle="tooltip" title="Atualizar serviço">
                        <i className="bi bi-pencil-fill"></i>
                      </Button>
                    </td>
                </tr>
            )
        })}
      </tbody>
        </Table>)}
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir o serviço?</Modal.Body>
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
)
}