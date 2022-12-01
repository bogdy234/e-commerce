import axios from "axios";

import { SERVER_URL } from "@constants/index";
import { User, UserLoginParams } from "@interfaces/user";

export const createUser = async (data: User) => {
    const { data: response } = await axios.post(
        `${SERVER_URL}/api/users/register`,
        data
    );

    return response.user;
};

export const loginUser = async (data: UserLoginParams) => {
    const { data: response } = await axios.post(
        `${SERVER_URL}/api/users/login`,
        data
    );

    return { user: response.user, token: response.token };
};

export const getUserData = async (token: string) => {
    const { data: response } = await axios.get(`${SERVER_URL}/api/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.user;
};

export const editUser = () => {
    // to be implemented
};
