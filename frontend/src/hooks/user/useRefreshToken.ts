import axios from "axios";
import { SERVER_URL } from "@constants/index";
import { useCookies } from "react-cookie";

const useRefreshToken = () => {
    const [cookies] = useCookies();
    const refresh = async () => {
        const token = cookies?.token;
        const { data: response } = await axios.get(
            `${SERVER_URL}/api/users/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return { user: response, token: token };
    };
    return refresh;
};

export default useRefreshToken;
