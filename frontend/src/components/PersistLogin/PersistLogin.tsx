import { Outlet } from "react-router-dom";

import useRefreshToken from "@hooks/user/useRefreshToken";
import { useEffect } from "react";
import useUser from "@hooks/user/useUser";
import { SET_USER, RESET_USER } from "@constants/user";

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
                    token: data.token,
                },
            });
        } else {
            dispatch({
                type: RESET_USER,
            });
        }
    }, [isLoading, data]);

    return <Outlet />;
    // return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
