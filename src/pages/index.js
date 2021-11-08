import { Container, Button, Grid } from "semantic-ui-react";
import { useRouter } from 'next/router';

export default function HomePage({ products }) {

  const router = useRouter();

  if (products.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1></h1>
            <img 
              src="https://img.freepik.com/vector-gratis/ningun-concepto-ilustracion-datos_108061-573.jpg?size=338&ext=jpg" 
              alt="No Product yet" />
            <div>
              <Button primary>Create a Product</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  
  return (
    <Container style={{padding: '30px'}}>
      <table className="ui selectable inverted table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th className="right aligned">Quantity</th>
              <th>Options</th>
            </tr>
          </thead>
        {products.map((product) => (
          <tbody key={product._id}>
            <tr>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td><Button primary  onClick={() => router.push(`/tasks/${product._id}`)}>View</Button></td>
              <td><Button onClick={() => router.push(`/tasks/${product._id}/edit`)}>Edit</Button></td>
            </tr>
          </tbody>
        ))}
      </table>


    </Container>
  )
}

export const getServerSideProps = async (ctx) => {

  const res = await fetch('https://nextjs-apprest.herokuapp.com/api/tasks')
  const products = await res.json()


  return {
    props: {
      products,
    },
  };
};