import { Container, Typography } from "@mui/material";
import { FC, ReactElement } from "react";

const Profile: FC = (): ReactElement => {
    return (
        <Container sx={{ mt: 14 }}>
            <Typography variant="h1">Profile</Typography>
        </Container>
    );
};

export default Profile;
