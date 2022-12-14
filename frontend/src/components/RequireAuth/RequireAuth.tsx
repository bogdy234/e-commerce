import { Navigate, Outlet, useLocation } from "react-router-dom";

import useUser from "@hooks/user/useUser";

const RequireAuth = ({ allowedRoles = ["BASIC_USER", "ADMIN"] }) => {
    const { state } = useUser();
    const location = useLocation();

    if (state?.token === null) {
        return <></>;
    }

    return allowedRoles.indexOf(state?.user?.role?.role_name || "") !== -1 ? (
        <Outlet />
    ) : state?.token ? ( //changed from user to accessToken to persist login after refresh
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/signin" state={{ from: location }} replace />
    );
};

export default RequireAuth;
