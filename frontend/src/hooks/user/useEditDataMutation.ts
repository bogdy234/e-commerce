import { useState } from "react";

import { validateEmail, validateName } from "@helpers/validate";

const useEditDataMutation = () => {
    // const [formError, setFormError] = useState<string>("");
    const [firstNameError, setFirstNameError] = useState<string>("");
    const [lastNameError, setLastNameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");

    const clearErrors = () => {
        setEmailError("");
        setFirstNameError("");
        setLastNameError("");
    };

    const validateInputs = (
        firstName: FormDataEntryValue | null,
        lastName: FormDataEntryValue | null,
        email: FormDataEntryValue | null
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

        const valid = {
            validFirstName,
            validLastName,
            validEmail
        };

        const isValid = !Object.values(valid).some((element) => !element);

        return isValid;
    };

    // const { mutate, isLoading } = useMutation(editUser, {
    //     onSuccess: (data) => {
    //         toast.success("Your data was successfully updated.");
    //     },
    //     onError: (data: any) => {
    //         setFormError(
    //             data?.response?.data?.message ||
    //                 "There was an error. Please try again later."
    //         );
    //     },
    //     onSettled: () => {
    //         queryClient.invalidateQueries({ queryKey: ["editUser"] });
    //     },
    // });

    return {
        firstNameError,
        lastNameError,
        emailError,
        // formError,
        // mutate,
        // isLoading,
        validateInputs,
        clearErrors
    };
};

export default useEditDataMutation;
