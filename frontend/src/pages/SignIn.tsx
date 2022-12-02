import { FC, FormEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useLoginMutation from "@hooks/user/useLoginMutation";
import useUser from "@hooks/user/useUser";
import { UserLoginParams } from "@interfaces/user";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const SignIn: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        clearErrors,
        emailError,
        passwordError,
        formError,
        mutate,
        isLoading,
        validateInputs
    } = useLoginMutation();

    const { state } = useUser();

    useEffect(() => {
        if (state?.user) {
            navigate(location.state.from);
        }
    }, [state?.user]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get("email"),
            password: data.get("password"),
            remember: data.get("remember") || ""
        };
        const { email, password, remember } = userData;
        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            typeof remember !== "string"
        ) {
            throw new Error("Type unsupported!");
        }

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
                    alignItems: "center"
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
