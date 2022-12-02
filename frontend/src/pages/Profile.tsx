import { FC, ReactElement, useState } from "react";

import EditData from "@components/EditData";
import useUser from "@hooks/user/useUser";
import { Avatar, Button, Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";

const Profile: FC = (): ReactElement => {
    const { state } = useUser();
    const [open, setOpen] = useState(false);

    const openEdit = () => setOpen(true);

    return (
        <Container sx={{ mt: 14 }}>
            <Container
                maxWidth="md"
                sx={{
                    background: "white",
                    height: 280,
                    p: 4,
                    borderRadius: 2
                }}
            >
                <Typography variant="h5" align="center">
                    Account data
                </Typography>
                <Stack sx={{ pt: 4 }} spacing={6} justifyContent="center">
                    <Stack direction="row" justifyContent="center" spacing={4}>
                        <Avatar sx={{ width: "80px", height: "80px" }} />
                        <Stack spacing={1}>
                            <Typography variant="body1">
                                First name: {state?.user?.first_name}
                            </Typography>
                            <Typography variant="body1">
                                Last name: {state?.user?.last_name}
                            </Typography>
                            <Typography variant="body1">
                                Email: {state?.user?.email}
                            </Typography>
                        </Stack>
                    </Stack>
                    <EditData open={open} setOpen={setOpen} />
                    <Button variant="outlined" onClick={openEdit}>
                        Edit data
                    </Button>
                </Stack>
            </Container>
        </Container>
    );
};

export default Profile;
