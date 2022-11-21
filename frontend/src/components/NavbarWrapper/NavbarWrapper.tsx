import Navbar from "@components/Navbar/Navbar";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const NavbarWrapper: FC = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default NavbarWrapper;
