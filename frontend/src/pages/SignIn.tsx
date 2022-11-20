import { FC, FormEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { isValidEmail } from "@helpers/helpers";
import CircularProgress from "@mui/material/CircularProgress";

import ERRORS from "@constants/errors";
import { loginUser } from "@api/user";
import { UserLoginParams } from "@interfaces/user";

const SignIn: FC = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(["token"]);
    const [formError, setFormError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    useEffect(() => {
        console.log(cookies?.token);
        if (cookies?.token) {
            navigate("/");
        }
    }, []);

    const { mutate, isLoading } = useMutation(loginUser, {
        onSuccess: (data) => {
            setCookie("token", data.token, { path: "/" });
            navigate("/");
        },
        onError: (data: any) => {
            setFormError(
                data?.response?.data?.message ||
                    "There was an error. Please try again later."
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["loginUser"] });
        },
    });

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    };

    const validateInputs = (
        email: FormDataEntryValue | null,
        password: FormDataEntryValue | null
    ) => {
        let isValid = true;

        if (!email) {
            setEmailError(ERRORS.NO_EMPTY_FIELD);
            isValid = false;
        }

        if (!password) {
            setPasswordError(ERRORS.NO_EMPTY_FIELD);
            isValid = false;
        }

        if (!isValidEmail(email as string)) {
            setEmailError(ERRORS.INVALID_EMAIL);
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get("email"),
            password: data.get("password"),
            remember: data.get("remember") || "",
        };

        clearErrors();

        const isValid = validateInputs(userData.email, userData.password);

        if (!isValid) {
            return;
        }

        mutate(userData as UserLoginParams);
    };

    return (
        <Container component="main" maxWidth="xs">
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
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={emailError !== ""}
                        helperText={emailError}
                        inputProps={{ maxLength: 50 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={passwordError !== ""}
                        helperText={passwordError}
                        inputProps={{ maxLength: 50 }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        name="remember"
                        label="Remember me"
                    />
                    {formError && (
                        <Typography color="error">{formError}</Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isLoading ? <CircularProgress /> : "Sign In"}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;
