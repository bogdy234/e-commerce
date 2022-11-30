import { FC } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "@components/Navbar/Navbar";

const NavbarWrapper: FC = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default NavbarWrapper;
