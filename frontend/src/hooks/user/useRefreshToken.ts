import axios from "axios";
import { SERVER_URL } from "@constants/index";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { User } from "@interfaces/user";

interface UseRefreshTokenData {
    isLoading: boolean;
    data: { user: User; token: string } | undefined;
}

const useRefreshToken = (): UseRefreshTokenData => {
    const [cookies] = useCookies();
    const refresh = async () => {
        const token = cookies?.token;
        const { data: response } = await axios.get(
            `${SERVER_URL}/api/users/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return { user: response, token: token };
    };

    const { isLoading, data } = useQuery({
        queryKey: ["userDataRefresh"],
        queryFn: refresh,
        retry: false,
        refetchOnWindowFocus: false
    });

    return { isLoading, data };
};

export default useRefreshToken;
