import { Dispatch, FC, ReactElement, SetStateAction } from "react";

import useUser from "@hooks/user/useUser";
import {
    Box,
    Button,
    Divider,
    Modal,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

interface EditDataProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const EditData: FC<EditDataProps> = ({ open, setOpen }): ReactElement => {
    const { state } = useUser();

    const handleClose = () => setOpen(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userData = {
            first_name: data.get("firstName"),
            last_name: data.get("lastName"),
            email: data.get("email"),
        };

        const { first_name, last_name, email } = userData;

        if (
            typeof first_name !== "string" ||
            typeof last_name !== "string" ||
            typeof email !== "string"
        ) {
            throw new Error("Invalid type.");
        }

        if (
            first_name === state?.user?.first_name &&
            last_name === state?.user?.last_name &&
            email === state?.user?.email
        ) {
            handleClose();
            return;
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box component="form" noValidate sx={style} onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Data administration
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <Stack spacing={3}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        inputProps={{
                            maxLength: 50,
                        }}
                        defaultValue={state?.user?.first_name}
                        // error={!!firstNameError}
                        // helperText={firstNameError}
                    />
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        inputProps={{ maxLength: 50 }}
                        defaultValue={state?.user?.last_name}
                        // error={!!lastNameError}
                        // helperText={lastNameError}
                    />
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        inputProps={{ maxLength: 50 }}
                        defaultValue={state?.user?.email}
                        // error={!!emailError}
                        // helperText={emailError}
                    />
                </Stack>
                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                    <Button sx={{ width: "50%" }} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        sx={{ width: "50%" }}
                        variant="outlined"
                        type="submit"
                    >
                        Save
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default EditData;
