import { Form, Grid, Button } from 'semantic-ui-react';
import { useState } from 'react';

export default function ProductFormPage() {
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        quantity: "",
    });

    const validate = () => {
        const errors = {};

        if (!newProduct.title) errors.title = "Nombre es requerido"
        if (!newProduct.price) errors.price = "El precio es requerido"
        if (!newProduct.quantity) errors.quantity = "La cantidad es requerida"

        return errors;
    }       

    const [errors, setErrors] = useState({})

    const  handleSubmit = async (e) => {
        e.preventDefault();
        let errors = validate()

        if (Object.keys(errors).length) setErrors(errors);

        await createProduct()
    }
    
    const createProduct = async () => {
        try {
            await fetch('http://localhost:3000/api/tasks/', { 
                method: 'POST', 
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(newProduct)
            })
        } catch (error) {
            console.log(error)
            }
        }

    const handleChange = (e) => 
        setNewProduct({...newProduct, [e.target.name]: e.target.value})


    return (
        <Grid
            centered
            verticalAlign="middle"
            columns="3"
            style={{ height: '80vh' }}
        >
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <Form onSubmit={handleSubmit}>
                        <Form.Input label="Product" placeholder="Product" name="title" onChange={handleChange} error={errors.title ? {content: 'Please enter a product name', pointing: "below"}: null}></Form.Input>
                        <Form.Input label="Price" placeholder="Price" name="price" onChange={handleChange} error={errors.price ? {content: 'Please enter a product price'}: null}></Form.Input>
                        <Form.Input label="Quantity" placeholder="Quantity" name="quantity" onChange={handleChange} error={errors.quantity ? {content: 'Please enter a quantity'}: null}></Form.Input>

                        
                        <Button primary>
                            Save
                        </Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}