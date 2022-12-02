import { SERVER_URL } from "@constants/index";
import axios from "axios";

export const getCartProducts = async (token: string) => {
    const { data: response } = await axios.get(`${SERVER_URL}/api/users/cart`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
};

export const deleteCartProduct = async (token: string, cart_id: number) => {
    const data = {
        cart_id: cart_id
    };
    const { data: response } = await axios.delete(
        `${SERVER_URL}/api/users/cart`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data
        }
    );
    return response;
};

export const addCartProduct = async (
    token: string,
    productId: number,
    quantity: number
) => {
    const data = {
        product_id: productId,
        quantity
    };

    const { data: response } = await axios.post(
        `${SERVER_URL}/api/users/cart`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};

export const editCartProduct = async (
    token: string,
    cartId: number,
    productQuantity: number
) => {
    const data = {
        cart_id: cartId,
        new_quantity: productQuantity
    };

    const { data: response } = await axios.put(
        `${SERVER_URL}/api/users/cart`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response;
};
