import { FC, FormEvent } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface SearchbarProps {}

const Searchbar: FC<SearchbarProps> = () => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };

    return (
        <Paper
            component="form"
            sx={{
                p: "2px 4px",
                m: "0 20px",
                display: "flex",
                alignItems: "center",
                width: 400,
                height: 40,
            }}
            onSubmit={handleSubmit}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search a product"
                type="search"
                id="search"
                name="search"
                inputProps={{ "aria-label": "search a product" }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default Searchbar;
