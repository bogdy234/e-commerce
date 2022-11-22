import { useState, ReactElement, FC, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import Searchbar from "@components/Searchbar";
import { NavOption } from "@interfaces/navbar";
import { SCREEN_BREAKPOINTS } from "@constants";
import useUser from "@hooks/user/useUser";
import useFavoriteProducts from "@hooks/products/useFavoriteProducts";

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
import { useQueryClient } from "@tanstack/react-query";

const loggedInOptions = [
    {
        icon: <PersonIcon />,
        label: "Profile",
        href: "/profile",
    },
    { icon: <FavoriteIcon />, label: "Favorites", href: "/favorites" },
    { icon: <ShoppingCartIcon />, label: "My Cart", href: "/cart" },
    { icon: <LogoutIcon />, label: "Logout", href: "/" },
];

const loggedOutOptions = [
    { icon: <PersonIcon />, label: "Login", href: "/signin" },
];

const Navbar: FC = () => {
    const queryClient = useQueryClient();
    const matches = useMediaQuery(`(min-width:${SCREEN_BREAKPOINTS.md})`);
    const { state, dispatch } = useUser();
    const [, , removeCookie] = useCookies(["token"]);
    const { isLoading, favoriteProductsNumber } = useFavoriteProducts();

    const [options, setOptions] = useState<NavOption[]>([]);

    useEffect(() => {
        setOptions(state?.token ? loggedInOptions : loggedOutOptions);
    }, [state?.token]);

    const getIcons = (
        icon: ReactElement,
        showBadge: boolean,
        label: string
    ) => {
        if (label === "Favorites") {
            return (
                !isLoading &&
                showBadge && (
                    <Badge
                        badgeContent={favoriteProductsNumber}
                        color="secondary"
                        overlap="circular"
                    >
                        {icon}
                    </Badge>
                )
            );
        } else if (label === "Cart") {
            return (
                false &&
                showBadge && (
                    <Badge
                        badgeContent={favoriteProductsNumber}
                        color="secondary"
                        overlap="circular"
                    >
                        {icon}
                    </Badge>
                )
            );
        }
        return <>{icon}</>;
    };

    const onClick = (label: string) => {
        if (label !== "Logout") {
            return;
        }
        dispatch({ type: "SET_USER", payload: { user: null, token: "" } });
        removeCookie("token");
        queryClient.removeQueries(["favoriteProducts"]);
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
                                        ["Favorites", "My Cart"].includes(
                                            label
                                        ),
                                        label
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
