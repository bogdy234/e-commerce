import { FC } from "react";

import Searchbar from "@components/Searchbar";
import { SCREEN_BREAKPOINTS } from "@constants";

import { AppBar, Badge, Link, Stack, Toolbar, Typography } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";

import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactElement } from "react";

interface NavbarProps {}

const options = [
    { icon: <PersonIcon />, label: "Profile", href: "/signin" },
    { icon: <FavoriteIcon />, label: "Favorites", href: "/favorites" },
    { icon: <ShoppingCartIcon />, label: "My Cart", href: "/cart" },
];

const Navbar: FC<NavbarProps> = () => {
    const matches = useMediaQuery(`(min-width:${SCREEN_BREAKPOINTS.md})`);

    const getIcons = (icon: ReactElement, showBadge: boolean) => {
        return showBadge ? (
            <Badge badgeContent={4} color="secondary" overlap="circular">
                {icon}
            </Badge>
        ) : (
            <>{icon}</>
        );
    };

    return (
        <AppBar>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Link href="/" underline="none" sx={{ color: "white" }}>
                    <HomeIcon />
                </Link>
                <Searchbar />
                <Stack direction="row" spacing={3}>
                    {options.map(({ href, icon, label }) => (
                        <Link
                            href={href}
                            underline="none"
                            sx={{ color: "white" }}
                            key={label}
                        >
                            <Stack
                                sx={{
                                    cursor: "pointer",
                                }}
                                alignItems="center"
                            >
                                {getIcons(icon, label !== "Profile")}
                                {matches && (
                                    <Typography
                                        sx={{ ml: 1 }}
                                        variant="caption"
                                    >
                                        {label}
                                    </Typography>
                                )}
                            </Stack>
                        </Link>
                    ))}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
