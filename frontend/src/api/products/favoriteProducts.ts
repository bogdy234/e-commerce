import { SERVER_URL } from "@constants/index";
import axios from "axios";

export const getFavoriteProducts = async (token: string) => {
    const { data: response } = await axios.get(
        `${SERVER_URL}/api/products/favourites`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};

export const deleteFavoriteProduct = async (
    token: string,
    productId: number
) => {
    const data = {
        favourite_id: productId
    };
    const { data: response } = await axios.delete(
        `${SERVER_URL}/api/products/favourites`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data
        }
    );
    return response;
};

export const addFavoriteProduct = async (token: string, productId: number) => {
    const data = {
        product_id: productId
    };

    const { data: response } = await axios.post(
        `${SERVER_URL}/api/products/favourites`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};
