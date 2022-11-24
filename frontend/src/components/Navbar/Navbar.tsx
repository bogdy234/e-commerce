import { useState, ReactElement, FC, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

import Searchbar from "@components/Searchbar";
import { NavOption } from "@interfaces/navbar";
import { SCREEN_BREAKPOINTS } from "@constants";
import useUser from "@hooks/user/useUser";
import useFavoriteProducts from "@hooks/products/useFavoriteProducts";
import useRefreshToken from "@hooks/user/useRefreshToken";

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
import useCart from "@hooks/products/useCart";

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
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const matches = useMediaQuery(`(min-width:${SCREEN_BREAKPOINTS.md})`);
    const { state, dispatch } = useUser();
    const [, , removeCookie] = useCookies(["token"]);
    const { isLoading, favoriteProductsNumber } = useFavoriteProducts();
    const { isLoading: isLoadingCart, cartProductsNumber } = useCart();
    const { isLoading: isLoadingUserData } = useRefreshToken();

    const [options, setOptions] = useState<NavOption[]>([]);

    useEffect(() => {
        if (isLoadingUserData) {
            return;
        }
        setOptions(state?.token ? loggedInOptions : loggedOutOptions);
    }, [state?.token]);

    const getIcons = (
        icon: ReactElement,
        showBadge: boolean,
        label: string
    ) => {
        if (label === "Favorites") {
            return (
                showBadge && (
                    <Badge
                        badgeContent={isLoading ? 0 : favoriteProductsNumber}
                        color="secondary"
                        overlap="circular"
                    >
                        {icon}
                    </Badge>
                )
            );
        } else if (label === "My Cart") {
            return (
                showBadge && (
                    <Badge
                        badgeContent={isLoadingCart ? 0 : cartProductsNumber}
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

    const onClick = (label: string, href: string) => {
        if (label !== "Logout") {
            navigate(href);
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
                        <Button
                            onClick={() => onClick(label, href)}
                            key={label}
                        >
                            <Stack
                                sx={{
                                    cursor: "pointer",
                                    color: "white",
                                }}
                                alignItems="center"
                            >
                                {getIcons(
                                    icon,
                                    ["Favorites", "My Cart"].includes(label),
                                    label
                                )}
                                {matches && (
                                    <Typography variant="caption">
                                        {label}
                                    </Typography>
                                )}
                            </Stack>
                        </Button>
                    ))}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
