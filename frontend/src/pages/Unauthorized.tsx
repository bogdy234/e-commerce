import { FC } from "react";
import { Button, Container, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Unauthorized: FC = () => {
    const navigate = useNavigate();
    return (
        <Container sx={{ mt: 12 }} maxWidth={false}>
            <Stack alignItems="center" gap={4}>
                <Typography variant="h1">401 - Unauthorized</Typography>
                <Typography variant="h5">
                    Your authorization failed. Press the button to go home.
                </Typography>
                <Button variant="outlined" onClick={() => navigate("/")}>
                    Home
                </Button>
            </Stack>
        </Container>
    );
};

export default Unauthorized;
