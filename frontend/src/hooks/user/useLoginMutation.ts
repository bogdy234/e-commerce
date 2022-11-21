import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { loginUser } from "@api/user";
import useUser from "@hooks/user/useUser";
import ERRORS from "@constants/errors";
import { isValidEmail } from "@helpers/helpers";

const useLoginMutation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { dispatch } = useUser();
    const [cookies, setCookie] = useCookies(["token"]);
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
