import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, Form , Row, Col} from "react-bootstrap";
import ImgServico from "../../assets/servico.png";
import "./AddServico.css";

export function AdicionarServico() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    axios
      .post("http://localhost:3001/servicos", data)
      .then((response) => {
        toast.success("Serviço adicionado com sucesso!", {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/servicos");
      })
      .catch((error) => {
        toast.error("Houve um erro ao adicionar um novo Serviço.", {
          position: "bottom-left",
          duration: 3000,
        });
        console.log(error);
      });
  }

  return (
    <div className="container-formulario">
      <Row>
        <Col xs={5}>
          <img className="img-form" src={ImgServico} alt="Gatinho na tosa" />
        </Col>
        <Col>
        <h1 className="titleForm">Adicionar Novo Serviço</h1>
          <Form onSubmit={handleSubmit(onSubmit)} className="formAdd">
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                className={errors.nome && "is-invalid"}
                {...register("nome", {
                  required: "O nome do serviço é obrigatório.",
                })}
              />
              {errors.nome && (
                <Form.Text className="invalid-feedback">
                  {errors.nome.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="text"
                className={errors.preco && "is-invalid"}
                {...register("preco", {
                  required: "O serviço deve conter um preço.",
                  
                })}
              />
              {errors.preco && (
                <Form.Text className="invalid-feedback">
                  {errors.preco.message}
                </Form.Text>
              )}
            </Form.Group>
              <Button variant="success" className="botao-form" type="submit">
                Cadastrar
              </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
