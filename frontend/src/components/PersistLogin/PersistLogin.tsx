import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import useRefreshToken from "@hooks/user/useRefreshToken";
import { useEffect } from "react";
import useUser from "@hooks/user/useUser";
import { SET_USER, RESET_USER } from "@constants/user";

const PersistLogin = () => {
    const { dispatch } = useUser();
    const refresh = useRefreshToken();

    const { isLoading, data } = useQuery({
        queryKey: ["userDataRefresh"],
        queryFn: refresh,
        retry: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (isLoading) {
            return;
        }
        if (data?.user && data?.token) {
            dispatch({
                type: SET_USER,
                payload: {
                    user: data.user,
                    token: data.token,
                },
            });
        } else {
            dispatch({
                type: RESET_USER,
            });
        }
    }, [isLoading, data]);

    return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
