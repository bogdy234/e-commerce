import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CustomMenuList from "@components/CustomMenuList";
import DrawerList from "@components/DrawerList/DrawerList";
import Searchbar from "@components/Searchbar";
import { SCREEN_BREAKPOINTS } from "@constants";
import { SET_CATEGORY, SET_SEARCH } from "@constants/search";
import { SET_USER } from "@constants/user";
import useCart from "@hooks/products/useCart";
import useFavoriteProducts from "@hooks/products/useFavoriteProducts";
import useSearch from "@hooks/search/useSearch";
import useClickOutside from "@hooks/useClickOutside";
import useRefreshToken from "@hooks/user/useRefreshToken";
import useUser from "@hooks/user/useUser";
import { NavOption } from "@interfaces/navbar";
import CategoryIcon from "@mui/icons-material/Category";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
    AppBar,
    Badge,
    Button,
    ClickAwayListener,
    Stack,
    SwipeableDrawer,
    Toolbar,
    Typography
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useQueryClient } from "@tanstack/react-query";

const loggedInOptions = [
    {
        icon: <PersonIcon />,
        label: "Profile",
        href: "/profile"
    },
    { icon: <FavoriteIcon />, label: "Favorites", href: "/favorites" },
    { icon: <ShoppingCartIcon />, label: "My Cart", href: "/cart" },
    { icon: <LogoutIcon />, label: "Logout", href: "/" }
];

const loggedOutOptions = [
    { icon: <PersonIcon />, label: "Login", href: "/signin" }
];

const Navbar: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();
    const matches = useMediaQuery(`(min-width:${SCREEN_BREAKPOINTS.md})`);
    const matchesXs = useMediaQuery(`(min-width:${SCREEN_BREAKPOINTS.s})`);

    const { dispatch: dispatchSearch } = useSearch();
    const { state, dispatch } = useUser();
    const [, , removeCookie] = useCookies(["token"]);
    const { isLoading, favoriteProductsNumber } = useFavoriteProducts();
    const { isLoading: isLoadingCart, cartProductsNumber } = useCart();
    const { isLoading: isLoadingUserData } = useRefreshToken();
    const [isOpenedDrawer, setIsOpenedDrawer] = useState<boolean>(false);
    const [isOpenedFilterMenu, setIsOpenedFilterMenu] =
        useState<boolean>(false);
    const filterMenuRef = useRef(null);

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

    const onClickNavOption = (label: string, href: string) => {
        if (label !== "Logout") {
            navigate(href);
            return;
        }
        dispatch({ type: SET_USER, payload: { user: null, token: "" } });
        removeCookie("token");
        queryClient.removeQueries(["favoriteProducts"]);
    };

    const toggleDrawer = () => setIsOpenedDrawer(!isOpenedDrawer);

    const onSearch = (searchData: string) => {
        dispatchSearch({ type: SET_SEARCH, payload: { searchData } });
    };

    const toggleFilterMenu = () => setIsOpenedFilterMenu(!isOpenedFilterMenu);

    const handleClickCategory = (category: string) => {
        dispatchSearch({ type: SET_CATEGORY, payload: { category } });
    };

    useClickOutside(filterMenuRef, () => setIsOpenedFilterMenu(false));

    return (
        <AppBar>
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: 64
                }}
            >
                <Link to="/">
                    <HomeIcon sx={{ color: "white" }} />
                </Link>
                <SwipeableDrawer
                    anchor="right"
                    open={isOpenedDrawer}
                    onClose={() => {}}
                    onOpen={() => {}}
                >
                    {isOpenedDrawer ? (
                        <ClickAwayListener onClickAway={toggleDrawer}>
                            <div>
                                <DrawerList
                                    options={options}
                                    toggleDrawer={toggleDrawer}
                                    onClickNavOption={onClickNavOption}
                                />
                            </div>
                        </ClickAwayListener>
                    ) : (
                        <DrawerList
                            options={options}
                            toggleDrawer={toggleDrawer}
                            onClickNavOption={onClickNavOption}
                        />
                    )}
                </SwipeableDrawer>
                {location.pathname === "/" ? (
                    <Stack direction="row" alignItems="center">
                        <Searchbar onSearch={onSearch} />
                        <Button
                            sx={{ color: "white" }}
                            onClick={toggleFilterMenu}
                        >
                            <CategoryIcon />
                            <CustomMenuList
                                handleClickCategory={handleClickCategory}
                                open={isOpenedFilterMenu}
                                ref={filterMenuRef}
                            />
                        </Button>
                    </Stack>
                ) : null}
                <Stack direction="row" spacing={3}>
                    {matchesXs ? (
                        options.map(({ href, icon, label }) => (
                            <Button
                                onClick={() => onClickNavOption(label, href)}
                                key={label}
                            >
                                <Stack
                                    sx={{
                                        cursor: "pointer",
                                        color: "white"
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
                            </Button>
                        ))
                    ) : (
                        <Button onClick={toggleDrawer} sx={{ color: "white" }}>
                            {isOpenedDrawer ? <MenuOpenIcon /> : <MenuIcon />}
                        </Button>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
