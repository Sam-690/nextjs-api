import { Container, Button, Grid } from "semantic-ui-react";

export default function HomePage({ products }) {

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
              <th>Status</th>
              <th className="right aligned">Notes</th>
              <th>Options</th>
            </tr>
          </thead>
        {products.map((product) => (
          <tbody key={product}>
            <tr>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td className="right aligned">{product.quantity}</td>
              <td><Button primary>Edit</Button></td>
            </tr>
          </tbody>
        ))}
      </table>


    </Container>
  )
}

export const getServerSideProps = async (ctx) => {

  const res = await fetch('http://localhost:3000/api/tasks/')
  const products = await res.json()


  return {
    props: {
      products,
    },
  };
};