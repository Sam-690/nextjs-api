import { Grid, Button, Confirm, Loader } from "semantic-ui-react";
import { useState } from "react";
import { useRouter } from "next/router";
import Error from "next/error";

export default function TaskDetail({product, error}) {

    const [confirm, setConfirm] = useState(false);
    const { query, push } = useRouter();
    const [isDeleting, setDeleting] = useState(false);

    const open = () => setConfirm(true);
    const close = () => setConfirm(false);

    const deleteProuct = async () => {
        const {id} = query
        try {
            await fetch(`https://nextjs-apprest.herokuapp.com/api/tasks/${id}`, {
                method: 'DELETE',
            })
        } catch (error) {
            console.log(error)
        }
    }


    const handleDelete = () => {
        setDeleting(true);
        deleteProuct();
        close();
        push("/");
    }

    if (error && error.statusCode)
        return <Error statusCode={error.statusCode} title={error.statusText} />

        return <Grid centered verticalAlign="middle" columns="1" style={{ height: "80vh" }}>
            <Grid.Row>
                <div className="ui cards">
                    <div className="card">
                        <div className="content">
                            <div className="header">
                                <h1>Product</h1>
                            </div>
                            <div className="description">
                                <h3>Name: {product.title}</h3>
                                <p>Price: {product.price}</p>
                                <p>Quantity: {product.quantity}</p>
                                <p>Create At: {product.createdAt}</p>
                            </div>
                            <div> 
                                <Button color="red" onClick={open} loading={isDeleting}>Delete</Button> 
                            </div>
                        </div>
                    </div>
                </div>
            </Grid.Row>
            <Confirm content={`Are you sure you want to delete ${product._id}`} open={confirm} onConfirm={handleDelete} onCancel={close}/>
        </Grid>
}

export async function getServerSideProps({ query: {id}}) {
    const res = await fetch(`https://nextjs-apprest.herokuapp.com/api/tasks/${id}`);

    if (res.status === 200) {
        const product = await res.json();
        return {
            props: {
                product
            }
        }
    }

    return {
        props: {
            error: {
                statusCode: res.status,
                statusText: "Invalid Id",
            }
        }
    }
}
