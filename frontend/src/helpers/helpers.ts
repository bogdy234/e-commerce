import { Comment } from "@interfaces/comment";
import { Product } from "@interfaces/product";

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

export const generateIds = (
    range: number,
    starting = 0,
    strictLower = true
) => {
    const array = [];
    for (let i = starting; i < range; i++) {
        array.push(i);
    }
    if (!strictLower) {
        array.push(range);
    }
    return array;
};

export const filterProductsByName = (products: Product[], title: string) =>
    title === ""
        ? products
        : products.filter((product) =>
              product.title.toLowerCase().includes(title.toLowerCase())
          );

export default {};
