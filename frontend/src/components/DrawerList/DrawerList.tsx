import { NavOption } from "@interfaces/navbar";
import {
    Box,
    ClickAwayListener,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { FC, ReactElement } from "react";

interface DrawerListProps {
    options: NavOption[];
    toggleDrawer: () => void;
    onClickNavOption: (label: string, href: string) => void;
}

const DrawerList: FC<DrawerListProps> = ({
    options,
    toggleDrawer,
    onClickNavOption,
}): ReactElement => {
    return (
        <Box
            sx={{
                width: 250,
            }}
            role="presentation"
            onClick={toggleDrawer}
        >
            <List>
                {options &&
                    options.map((option) => (
                        <ListItem key={option.label} disablePadding>
                            <ListItemButton
                                onClick={() =>
                                    onClickNavOption(option.label, option.href)
                                }
                            >
                                <ListItemIcon>{option.icon}</ListItemIcon>
                                <ListItemText primary={option.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
        </Box>
    );
};

export default DrawerList;
