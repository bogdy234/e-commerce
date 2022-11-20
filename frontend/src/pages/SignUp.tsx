import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";

import ERRORS from "@constants/errors";
import { isValidEmail, isValidPassword } from "@helpers/helpers";
import { User } from "@interfaces/user";
import { createUser } from "@api/user";

const SignUp = () => {
    const [firstNameError, setFirstNameError] = useState<string>("");
    const [lastNameError, setLastNameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [confirmPasswordError, setConfirmPasswordError] =
        useState<string>("");

    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation(createUser, {
        onSuccess: (data) => {
            console.log(data);
            const message = "success";
            alert(message);
        },
        onError: () => {
            alert("there was an error");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["createUser"] });
        },
    });

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
        setFirstNameError("");
        setLastNameError("");
        setConfirmPasswordError("");
    };

    const validateInputs = (
        firstName: FormDataEntryValue | null,
        lastName: FormDataEntryValue | null,
        email: FormDataEntryValue | null,
        password: FormDataEntryValue | null,
        confirmPassword: FormDataEntryValue | null
    ) => {
        let isValid = true;
        if (!firstName) {
            setFirstNameError(ERRORS.NO_EMPTY_FIELD);
            isValid = false;
        }

        if (!lastName) {
            setLastNameError(ERRORS.NO_EMPTY_FIELD);
            isValid = false;
        }

        if (!email) {
            setEmailError(ERRORS.NO_EMPTY_FIELD);
            isValid = false;
        } else if (!isValidEmail(email as string)) {
            setEmailError(ERRORS.INVALID_EMAIL);
            isValid = false;
        }

        if (!password) {
            setPasswordError(ERRORS.NO_EMPTY_FIELD);
            isValid = false;
        } else if (!isValidPassword(password as string)) {
            setPasswordError(ERRORS.INVALID_PASSWORD);
            isValid = false;
        }

        if (!confirmPassword) {
            setConfirmPasswordError(ERRORS.NO_EMPTY_FIELD);
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError(ERRORS.PASSWORDS_NOT_MATCH);
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userData = {
            first_name: data.get("firstName"),
            last_name: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password"),
            confirm_password: data.get("confirmPassword"),
        };
        const { first_name, last_name, email, password, confirm_password } =
            userData;

        clearErrors();
        const isValid = validateInputs(
            first_name,
            last_name,
            email,
            password,
            confirm_password
        );

        if (!isValid) {
            return;
        }

        mutate(userData as User);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 14,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                inputProps={{ maxLength: 50 }}
                                error={!!firstNameError}
                                helperText={firstNameError}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                inputProps={{ maxLength: 50 }}
                                error={!!lastNameError}
                                helperText={lastNameError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                inputProps={{ maxLength: 50 }}
                                error={!!emailError}
                                helperText={emailError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                inputProps={{ maxLength: 50 }}
                                error={!!passwordError}
                                helperText={passwordError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm password"
                                type="password"
                                id="confirmPassword"
                                inputProps={{ maxLength: 50 }}
                                error={!!confirmPasswordError}
                                helperText={confirmPasswordError}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isLoading ? <CircularProgress /> : "Sign Up"}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUp;
