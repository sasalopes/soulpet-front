import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";


export function Agendamentos() {

    const [agendamentos, setAgendamentos] = useState(null);
    
    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/agendamentos")
            .then(response => {
                setAgendamentos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="agendamentos container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Agendamentos</h1>
            </div>
                    {
                        agendamentos === null ?
                        <Loader /> 
                        :
                        <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Data</th>
                                <th>cratedAt</th>
                                <th>petId</th>
                                <th>ServiçoId</th>
                                <th>Ações</th>

                            </tr>
                        </thead>
                        <tbody>
                           {agendamentos.map(agendamentos => {
                            return (
                                <tr key={agendamentos.id}>
                                    <td>{agendamentos.id}</td>
                                    <td>{new Date(agendamentos.data).toLocaleDateString('pt-BR')}</td>
                                    <td>{agendamentos.createdAt}</td>
                                    <td>{agendamentos.petId}</td>
                                    <td>{agendamentos.servicoId}</td>
                                    <td className="d-flex gap-2">
                                        <Button>
                                        <i className="bi bi-trash-fill"></i>
                                        </Button>
                                        <Button>
                                        <i className="bi bi-pencil-fill"></i>
                                        </Button>
                                    </td>
                                </tr>
                            )
                           })}   
                        </tbody>
                    </Table>
                    }
        </div>
    );
}