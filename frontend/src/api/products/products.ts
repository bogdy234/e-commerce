import { SERVER_URL } from "@constants/index";
import axios from "axios";

export const getProducts = async () => {
    const { data: response } = await axios.get(`${SERVER_URL}/api/products`);
    return response || [];
};
