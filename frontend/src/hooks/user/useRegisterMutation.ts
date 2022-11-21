import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUser } from "@api/user";
import ERRORS from "@constants/errors";
import { isValidEmail, isValidPassword } from "@helpers/helpers";

const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [formError, setFormError] = useState<string>("");
    const [firstNameError, setFirstNameError] = useState<string>("");
    const [lastNameError, setLastNameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [confirmPasswordError, setConfirmPasswordError] =
        useState<string>("");

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

    const { mutate, isLoading } = useMutation(createUser, {
        onSuccess: (data) => {
            navigate("/signin");
        },
        onError: (data: any) => {
            setFormError(
                data?.response?.data?.message ||
                    "There was an error. Please try again later."
            );
            alert("there was an error");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["createUser"] });
        },
    });

    return {
        firstNameError,
        lastNameError,
        emailError,
        passwordError,
        confirmPasswordError,
        formError,
        mutate,
        isLoading,
        validateInputs,
        clearErrors,
    };
};

export default useRegisterMutation;
