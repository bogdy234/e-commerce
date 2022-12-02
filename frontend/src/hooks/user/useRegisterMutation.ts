import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "@api/user";
import {
    validateConfirmPassword,
    validateEmail,
    validateName,
    validatePassword
} from "@helpers/validate";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
        const { valid: validFirstName, error: errorFirstName } = validateName(
            firstName as string
        );
        if (!validFirstName) {
            setFirstNameError(errorFirstName);
        }

        const { valid: validLastName, error: errorLastName } = validateName(
            lastName as string
        );

        if (!validLastName) {
            setLastNameError(errorLastName);
        }

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

        const { valid: validConfirmPassword, error: errorConfirmPassword } =
            validateConfirmPassword(
                password as string,
                confirmPassword as string
            );

        if (!validConfirmPassword) {
            setConfirmPasswordError(errorConfirmPassword);
        }

        const valid = {
            validFirstName,
            validLastName,
            validEmail,
            validPassword,
            validConfirmPassword
        };

        const isValid = !Object.values(valid).some((element) => !element);

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
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["createUser"] });
        }
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
        clearErrors
    };
};

export default useRegisterMutation;
