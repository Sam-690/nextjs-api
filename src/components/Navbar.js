import {Menu, Container, Button} from 'semantic-ui-react';
import {useRouter} from 'next/router';
import Link from 'next/link';

export const Navbar = () => {

        const router = useRouter()

    return (
        <Menu inverted bordeless="true" style={{ padding: ".3rem", marginBottom: "20px" }} attached> 
            <Container>
               <Menu.Item>
                   <Link href="/">
                        <img src="/vercel.svg" alt="" />   
                   </Link>
                </Menu.Item> 
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button primary size="mini" onClick={() => router.push('/tasks/new')}>
                            New Product
                        </Button>
                    </Menu.Item>
                </Menu.Menu> 
            </ Container>
        </Menu>
    )
}