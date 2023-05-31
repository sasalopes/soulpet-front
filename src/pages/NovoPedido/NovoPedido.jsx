import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import ImgPETform from "../../assets/soul-pet-logo.svg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



export function NovoPedido() {

    const { control, register, handleSubmit, formState: { errors } } = useForm();
    const [produtos, setProdutos] = useState([]); 
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate();
    
      const { fields, append, remove } = useFieldArray({
        control,
        name: 'produtos',
      });

    useEffect(() => {
        axios.get("http://localhost:3001/produtos")
        .then(response => {
            setProdutos(response.data);
        })
        .catch(error => {
            console.log(error);
        });

        axios.get("http://localhost:3001/clientes") 
        .then(response => {
            setClientes(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [])

    function onSubmit(data) {
        axios.post("http://localhost:3001/pedidos", data)
            .then(response => {
                toast.success("Pedido adicionado.", { position: "bottom-right", duration: 2000 });
                navigate("/pedidos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    return (
        <div className="justify-content-between align-items-center m-4">
            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={5}>
                    <img className="img-form ms-5" src={ImgPETform} alt="soul-pet-logo" />
                </Col>
                <Col className="justify-content-center ms-5">
                    <h1>Novo pedido</h1>
            <Form className="w-75" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Control type="hidden" {...register("codigo")} value={uuidv4()}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control type="number" className={errors.quantidade && "is-invalid"} {...register("quantidade", { required: "A quantidade é obrigatória.",
                    maxLength: { value: 250, message: "Máximo de  250 caracteres."} })} />
                    {errors.quantidade && <Form.Text className="invalid-feedback">{errors.quantidade.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Clientes</Form.Label>
                    <Form.Select className={errors.clienteId && "is-invalid"}
                        {...register("clienteId", {required: "O cadastro será realizado no nome de qual cliente?"})}>
                            <option value=""> Escolha um cliente...</option>
                        {clientes.map(cliente => 
                            <option value={cliente.id}>{cliente.nome}</option>
                        )}
                    </Form.Select>
                    {errors.clienteId && <Form.Text className="invalid-feedback">{errors.clienteId.message}</Form.Text>}
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Produtos</Form.Label>
                    <Form.Select className={errors.produtoId && "is-invalid"}
                        {...register("produtoId", {required: "Escolha um produto e depois efetue o cadastro."})}>
                            <option value=""> Escolha um produto...</option>
                        {produtos.map(produto => 
                            <option value={produto.id}>{produto.nome}</option>
                        )}
                    </Form.Select>
                    {errors.produtoId && <Form.Text className="invalid-feedback">{errors.produtoId.message}</Form.Text>}
                </Form.Group>
                
                <Form onSubmit={handleSubmit((data) => console.log(data))}>
                    {fields.map((field, index) => (
                        <Form.Group className="mb-3" produtoId={`items[${index}].name`}>
                        <Form.Label>Produtos</Form.Label>
                        <Form.Select {...register(`items.${index}.name`)} defaultValue="">
                            <option value="">Escolha um produto...</option>
                            {produtos.map(produto => (
                            <option value={produto.id}>
                                {produto.nome}
                            </option>
                            ))}
                        </Form.Select>
                        <br></br>       
                        <Button variant="info" onClick={() => remove(index)}>
                            Remover
                        </Button>                    
                        </Form.Group>
                    ))}
                    <div className="mb-3">
                    <Button variant="info" onClick={() => append({ name: '' })}>
                        Adicionar novo produto
                    </Button>
                    </div>
                    </Form>

                <Button variant="dark" type="submit">
                    Enviar pedido
                </Button>
            </Form>
                </Col>
            </Row>

        </div>
    );
}