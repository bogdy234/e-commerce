import { FC } from "react";
import { Container } from "@mui/material";
import ProductsBox from "@components/Products Box";
import MenuList from "Menu List";

const Home: FC = () => {
    return (
        <>
    <Container sx={{width:'100%', display: 'inline-flex', justifyContent: 'space-between'}}>
        <Container sx={{ ml: "-60px",mt:"50px" }}>
        <MenuList/>
        </Container>
        <Container sx={{ mt: "100px" }}>
            <ProductsBox />
        </Container>
        </Container>
        </>

    );
};

export default Home;
