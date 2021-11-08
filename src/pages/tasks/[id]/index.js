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
                <Grid.Column textAlign="center">
                    <h1>{product.title}</h1>
                    <p>{product.price}</p>
                    <p>{product.quantity}</p>
                    <p>{product.createdAt}</p>

                    <div> 
                        <Button color="red" onClick={open} loading={isDeleting}>Delete</Button> 
                    </div>
                </Grid.Column>
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
