import { Comment } from "@interfaces/comment";

export const isValidEmail = (email: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(email);
};

export const isValidPassword = (password: string) => {
    const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g;
    return passwordRegex.test(password);
};

export const getMeanRatingComments = (comments: Comment[]): number => {
    const initialValue = 0;

    if (!comments?.length) {
        return initialValue;
    }

    return parseFloat(
        (
            Math.round(
                (comments
                    .map((comment) => comment.rating)
                    .reduce((acc, curr) => acc + curr, initialValue) /
                    comments.length) *
                    100
            ) / 100
        ).toFixed(2)
    );
};

export default {};
