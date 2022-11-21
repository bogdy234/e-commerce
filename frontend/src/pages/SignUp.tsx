import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";

import { User } from "@interfaces/user";
import useRegisterMutation from "@hooks/user/useRegisterMutation";

const SignUp = () => {
    const {
        clearErrors,
        confirmPasswordError,
        emailError,
        firstNameError,
        formError,
        lastNameError,
        passwordError,
        validateInputs,
        mutate,
        isLoading,
    } = useRegisterMutation();

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
                    {formError && (
                        <Typography color="error">{formError}</Typography>
                    )}
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
