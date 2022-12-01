import { ElementType, FC, forwardRef, ReactElement, Ref } from "react";

import CableIcon from "@mui/icons-material/Cable";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
} from "@mui/material";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";

const data = [
    { icon: <SportsEsportsIcon />, label: "Gaming" },
    { icon: <CableIcon />, label: "Electronics" },
    { icon: <CheckroomIcon />, label: "Fashion" },
];

const FireNav = styled(List)<{ component?: ElementType }>({
    "& .MuiListItemButton-root": {
        paddingLeft: 24,
        paddingRight: 24,
    },
    "& .MuiListItemIcon-root": {
        minWidth: 0,
        marginRight: 16,
    },
    "& .MuiSvgIcon-root": {
        fontSize: 20,
    },
});

const theme = createTheme({
    components: {
        MuiListItemButton: {
            defaultProps: {
                disableTouchRipple: true,
            },
        },
    },
    palette: {
        mode: "dark",
        primary: { main: "rgb(102, 157, 246)" },
        background: { paper: "rgb(5, 30, 52)" },
    },
});

interface CustomMenuListProps {
    open: boolean;
    handleClickCategory: (category: string) => void;
    ref: Ref<HTMLElement>;
}

const CustomMenuList: FC<CustomMenuListProps> = forwardRef<
    HTMLElement,
    CustomMenuListProps
>(({ open, handleClickCategory }, ref): ReactElement => {
    return (
        <Box
            sx={{
                display: "flex",
                position: "absolute",
                left: "-40px",
                top: "50px",
                zIndex: 99,
            }}
            ref={ref}
        >
            <ThemeProvider theme={theme}>
                <Paper elevation={0} sx={{ maxWidth: 300, borderRadius: 0 }}>
                    <FireNav component="nav" disablePadding>
                        <Box
                            sx={{
                                bgcolor: open ? "rgba(71, 98, 130, 0.1)" : null,
                                pb: open ? 2 : 0,
                            }}
                        >
                            {open &&
                                data.map((item) => (
                                    <ListItemButton
                                        key={item.label}
                                        sx={{
                                            py: 0,
                                            minHeight: 52,
                                            color: "rgba(255,255,255,.8)",
                                        }}
                                        onClick={() =>
                                            handleClickCategory(item.label)
                                        }
                                    >
                                        <ListItemIcon sx={{ color: "inherit" }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                fontSize: 14,
                                                fontWeight: "medium",
                                            }}
                                        />
                                    </ListItemButton>
                                ))}
                        </Box>
                    </FireNav>
                </Paper>
            </ThemeProvider>
        </Box>
    );
});

export default CustomMenuList;
