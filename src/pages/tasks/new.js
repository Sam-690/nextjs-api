import { Form, Grid, Button } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProductFormPage() {
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        quantity: "",
    });

    const [errors, setErrors] = useState({
        title: "",
        price: "",
        quantity: "",
    })

    const {query, push} = useRouter();

    const validate = () => {
        const errors = {};

        if (!newProduct.title) errors.title = "Nombre es requerido"
        if (!newProduct.price) errors.price = "El precio es requerido"
        if (!newProduct.quantity) errors.quantity = "La cantidad es requerida"

        return errors;
    }       

    const  handleSubmit = async (e) => {
        e.preventDefault();
        let errors = validate()

        if (Object.keys(errors).length) setErrors(errors);

        if (query.id) {
            await updateProduct();
        }else{
            await createProduct();
        }

        await createProduct()
        await push('/')
    }
    
    const createProduct = async () => {
        try {
            await fetch('https://nextjs-apprest.herokuapp.com/api/tasks/', { 
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

    const getProduct =  async () => {
        const res = await fetch("https://nextjs-apprest.herokuapp.com/api/tasks/" + query.id);
        const data = await res.json()
        setNewProduct({title: data.title, price: data.price, quantity: data.quantity});
    }

    useEffect(() => {
        if (query.id) getProduct();
   }, [])

   const updateProduct = async () => {
       try {
           await fetch("https://nextjs-apprest.herokuapp.com/api/tasks/" + query.id, {
               method: "PUT",
               headers: {
                   "Content-Type": "application/json",
               },
               body: JSON.stringify(newProduct)
           })
       } catch (error) {
           console.error(error);
       }
   }

    return (
        <Grid
            centered
            verticalAlign="middle"
            columns="3"
            style={{ height: '80vh' }}
        >
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <h1>{query.id ? 'Update Product' : 'Create Product'}</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input label="Product" placeholder="Product" name="title" onChange={handleChange} error={errors.title ? {content: 'Please enter a product name', pointing: "below"}: null} value={newProduct.title}></Form.Input>
                        <Form.Input label="Price" placeholder="Price" name="price" onChange={handleChange} error={errors.price ? {content: 'Please enter a product price'}: null} value={newProduct.price}></Form.Input>
                        <Form.Input label="Quantity" placeholder="Quantity" name="quantity" onChange={handleChange} error={errors.quantity ? {content: 'Please enter a quantity'}: null} value={newProduct.quantity}></Form.Input>

                        
                        <Button primary>
                            {query.id ? 'Update' : 'Create'}
                        </Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}