import { FC } from "react";
import Counter from "@components/Counter";
import { Container } from "@mui/material";

const Home: FC = () => {
    return (
        <Container sx={{ mt: "90px" }} maxWidth={false}>
            <Counter />
        </Container>
    );
};

export default Home;
