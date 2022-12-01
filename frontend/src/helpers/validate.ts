import ERRORS from "@constants/errors";

import { containOnlyLetters, isValidEmail, isValidPassword } from "./helpers";

export const validateName = (name: string) => {
    if (!name) {
        return { valid: false, error: ERRORS.NO_EMPTY_FIELD };
    } else if (!containOnlyLetters(name)) {
        return { valid: false, error: ERRORS.ONLY_LETTERS };
    }

    return { valid: true, error: "" };
};

export const validateEmail = (email: string) => {
    if (!email) {
        return { valid: false, error: ERRORS.NO_EMPTY_FIELD };
    } else if (!isValidEmail(email as string)) {
        return { valid: false, error: ERRORS.INVALID_EMAIL };
    }

    return { valid: true, error: "" };
};

export const validatePassword = (password: string, forLogin = false) => {
    if (!password) {
        return { valid: false, error: ERRORS.NO_EMPTY_FIELD };
    } else if (forLogin && !isValidPassword(password as string)) {
        return { valid: false, error: ERRORS.INVALID_PASSWORD };
    }

    return { valid: true, error: "" };
};

export const validateConfirmPassword = (
    password: string,
    confirmPassword: string
) => {
    if (!confirmPassword) {
        return { valid: false, error: ERRORS.NO_EMPTY_FIELD };
    } else if (password !== confirmPassword) {
        return { valid: false, error: ERRORS.PASSWORDS_NOT_MATCH };
    }
    return { valid: true, error: "" };
};
