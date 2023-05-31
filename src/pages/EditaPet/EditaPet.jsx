import { Button, Col, Form, Row } from "react-bootstrap";
import ImgPETform from "../../assets/soul-pet-logo.svg";
import "./AddPet-style.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export function EditaPet() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  function onSubmit(data) {
    axios
      .put(`http://localhost:3001/pets/${id}`, data)
      .then((response) => {
        toast.success("Pet editado com sucesso!", {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/pets");
      })
      .catch((error) => {
        toast.error("Não foi possível editar o Pet.", {
          position: "bottom-left",
          duration: 3000,
        });
        console.log(error);
      });
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/pets/${id}`)
    .then((response) => {
      const { nome, tipo, porte, dataNasc, clienteId } = response.data;
      reset({ nome, tipo, porte, dataNasc, clienteId });
    });
  }, [id, reset]);

  return (
    <div className="container-form">
      <Row>
        <Col xs={5}>
          <img className="img-form" src={ImgPETform} alt="LOGO" />
        </Col>
        <Col>
          <h1>Editar Pet</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                className={errors.nome && "is-invalid"}
                {...register("nome", {
                  required: "O nome do Pet é obrigatório.",
                  maxLength: {
                    value: 130,
                    message: "Limite de 130 caracteres.",
                  },
                })}
              />
              {errors.nome && (
                <Form.Text className="invalid-feedback">
                  {errors.nome.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                className={errors.tipo && "is-invalid"}
                {...register("tipo", {
                  required: "É  obrigatório declarar o tipo do Pet.",
                  maxLength: {
                    value: 100,
                    message: "Limite de 100 caracteres.",
                  },
                })}
              />
              {errors.tipo && (
                <Form.Text className="invalid-feedback">
                  {errors.tipo.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Porte</Form.Label>
              <Form.Control
                type="text"
                className={errors.porte && "is-invalid"}
                {...register("porte", {
                  required: "O porte do Pet é obrigatório.",
                  maxLength: {
                    value: 100,
                    message: "Limite de 100 caracteres.",
                  },
                })}
              />
              {errors.porte && (
                <Form.Text className="invalid-feedback">
                  {errors.porte.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                className={errors.dataNasc && "is-invalid"}
                {...register("dataNasc", {
                  required: "O dataNasc do Pet é obrigatório.",
                  maxLength: {
                    value: 100,
                    message: "Limite de 100 caracteres.",
                  },
                })}
              />
              {errors.dataNasc && (
                <Form.Text className="invalid-feedback">
                  {errors.dataNasc.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Id do Cliente</Form.Label>
              <Form.Control
                type="number"
                className={errors.clienteId && "is-invalid"}
                {...register("clienteId", {
                  required: "É necessário informar o Id do dono do Pet.",
                  maxLength: {
                    value: 100,
                    message: "Limite de 100 caracteres.",
                  },
                })}
              />
              {errors.clienteId && (
                <Form.Text className="invalid-feedback">
                  {errors.clienteId.message}
                </Form.Text>
              )}
            </Form.Group>

            <Button variant="success" className="botao-form" type="submit">
              Editar
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
