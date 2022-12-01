import { FC, FormEvent } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper } from "@mui/material";

interface SearchbarProps {
    onSearch: (searchData: string) => void;
}

const Searchbar: FC<SearchbarProps> = ({ onSearch }) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const searchData = data.get("search");
        if (typeof searchData !== "string") {
            throw new Error("Invalid data type.");
        }
        onSearch(searchData);
    };

    return (
        <Paper
            component="form"
            sx={{
                p: "2px 4px",
                m: "0 20px",
                display: "flex",
                alignItems: "center",
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
