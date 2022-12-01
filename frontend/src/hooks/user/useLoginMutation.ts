import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { loginUser } from "@api/user";
import { validateEmail, validatePassword } from "@helpers/validate";
import useUser from "@hooks/user/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLoginMutation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { dispatch } = useUser();
    const [, setCookie] = useCookies(["token"]);
    const [formError, setFormError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    };

    const validateInputs = (
        email: FormDataEntryValue | null,
        password: FormDataEntryValue | null
    ) => {
        const { valid: validEmail, error: errorEmail } = validateEmail(
            email as string
        );

        if (!validEmail) {
            setEmailError(errorEmail);
        }

        const { valid: validPassword, error: errorPassword } = validatePassword(
            password as string
        );

        if (!validPassword) {
            setPasswordError(errorPassword);
        }

        const valid = {
            validEmail,
            validPassword,
        };

        const isValid = !Object.values(valid).some((element) => !element);

        return isValid;
    };

    const { mutate, isLoading } = useMutation(loginUser, {
        onSuccess: (data) => {
            const { user, token } = data;
            setCookie("token", data.token, { path: "/" });
            dispatch({ type: "SET_USER", payload: { user, token } });
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

    return {
        clearErrors,
        formError,
        mutate,
        isLoading,
        emailError,
        passwordError,
        validateInputs,
    };
};

export default useLoginMutation;
