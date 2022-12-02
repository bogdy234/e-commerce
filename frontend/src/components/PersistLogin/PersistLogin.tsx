import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { RESET_USER, SET_USER } from "@constants/user";
import useRefreshToken from "@hooks/user/useRefreshToken";
import useUser from "@hooks/user/useUser";

const PersistLogin = () => {
    const { dispatch } = useUser();
    const { isLoading, data } = useRefreshToken();

    useEffect(() => {
        if (isLoading) {
            return;
        }
        if (data?.user && data?.token) {
            dispatch({
                type: SET_USER,
                payload: {
                    user: data.user,
                    token: data.token
                }
            });
        } else {
            dispatch({
                type: RESET_USER
            });
        }
    }, [isLoading, data]);

    return <Outlet />;
    // return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
