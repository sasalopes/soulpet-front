import axios from "axios";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export function EditaServico(){
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const {id} = useParams();
    const navigate = useNavigate();
    function onSubmit(data){
        axios.put(`http://localhost:3001/servicos/${id}`, data)
        .then(response =>{
            toast.success("Serviço editado.", {duration:2000, position:"bottom-right"});
            navigate("/servicos");
        })
        .catch(err =>{
            toast.error("Um erro ocorreu", {duration:2000, position:"bottom-right"});
            console.log(err);
        })
    }

    useEffect(() =>{
        axios.get(`http://localhost:3001/servicos/${id}`)
        .then(res =>{
            const {nome, preco} = res.data;
            reset({nome, preco});
        })
    },[id, reset]);

    return(
        <div className="container">
        <h1 className="mt-3">Editar Serviço</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" className={errors.nome && `is-invalid`} {...register("nome",{required:"O nome é obrigatório",maxLength:{value:255, message:"Limite de 255 caracteres"}})}/>
                {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Preço</Form.Label>
                <Form.Control type="text" className={errors.preco && `is-invalid`} {...register("preco",{required:"O preço é obrigatório",maxLength:{value:20, message:"Limite de 20 caracteres"}})}/>
                {errors.preco && <Form.Text className="invalid-feedback">{errors.preco.message}</Form.Text>}
            </Form.Group>
            <Button variant="primary" type="submit">
                Editar
            </Button>
        </Form>
        </div>
    )
}