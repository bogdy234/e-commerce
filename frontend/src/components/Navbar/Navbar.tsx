import { useState, ReactElement, FC, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import Searchbar from "@components/Searchbar";
import { NavOption } from "@interfaces/navbar";
import { SCREEN_BREAKPOINTS } from "@constants";
import useUser from "@hooks/user/useUser";

import {
    AppBar,
    Badge,
    Button,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import useMediaQuery from "@mui/material/useMediaQuery";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
    const matches = useMediaQuery(`(min-width:${SCREEN_BREAKPOINTS.md})`);
    const { state, dispatch } = useUser();
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const [options, setOptions] = useState<NavOption[]>([
        { icon: <PersonIcon />, label: "Login", href: "/signin" },
        { icon: <FavoriteIcon />, label: "Favorites", href: "/favorites" },
        { icon: <ShoppingCartIcon />, label: "My Cart", href: "/cart" },
    ]);

    useEffect(() => {
        if (state?.token) {
            const newOptions = [...options];
            newOptions[0] = {
                icon: <PersonIcon />,
                label: "Profile",
                href: "/profile",
            };
            newOptions[3] = {
                icon: <LogoutIcon />,
                label: "Logout",
                href: "/",
            };
            setOptions(newOptions);
        } else {
            let newOptions = [...options];
            newOptions[0] = {
                icon: <PersonIcon />,
                label: "Login",
                href: "/signin",
            };
            newOptions = newOptions.filter((option, index) => index !== 3);
            setOptions(newOptions);
        }
    }, [cookies]);

    const getIcons = (icon: ReactElement, showBadge: boolean) => {
        return showBadge ? (
            <Badge badgeContent={4} color="secondary" overlap="circular">
                {icon}
            </Badge>
        ) : (
            <>{icon}</>
        );
    };

    const onClick = (label: string) => {
        if (label !== "Logout") {
            return;
        }
        dispatch({ type: "SET_USER", payload: { user: null, token: "" } });
        removeCookie("token");
    };

    return (
        <AppBar>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Link to="/">
                    <HomeIcon sx={{ color: "white" }} />
                </Link>
                <Searchbar />
                <Stack direction="row" spacing={3}>
                    {options.map(({ href, icon, label }) => (
                        <Button onClick={() => onClick(label)} key={label}>
                            <Link to={href} style={{ textDecoration: "none" }}>
                                <Stack
                                    sx={{
                                        cursor: "pointer",
                                        color: "white",
                                    }}
                                    alignItems="center"
                                >
                                    {getIcons(
                                        icon,
                                        ["Favorites", "My Cart"].includes(label)
                                    )}
                                    {matches && (
                                        <Typography variant="caption">
                                            {label}
                                        </Typography>
                                    )}
                                </Stack>
                            </Link>
                        </Button>
                    ))}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
