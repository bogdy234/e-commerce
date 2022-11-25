import { Container, Typography } from "@mui/material";
import { FC, ReactElement } from "react";

const Checkout: FC = (): ReactElement => {
    return (
        <Container sx={{ mt: 12 }}>
            <Typography variant="h2">Checkout</Typography>
        </Container>
    );
};

export default Checkout;
