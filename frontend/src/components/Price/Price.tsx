import { FC, ReactElement } from "react";
import { Typography } from "@mui/material";

interface PriceProps {
    normalPrice: number;
    reducedPrice: number;
}

const Price: FC<PriceProps> = ({ normalPrice, reducedPrice }): ReactElement => {
    if (normalPrice === reducedPrice) {
        return (
            <Typography variant="h6" sx={{ verticalAlign: "center" }}>
                {normalPrice}$
            </Typography>
        );
    }
    return (
        <div>
            <Typography sx={{ textDecoration: "line-through" }} variant="body2">
                {normalPrice}$
            </Typography>
            <Typography variant="h6">{reducedPrice}$</Typography>
        </div>
    );
};

export default Price;
