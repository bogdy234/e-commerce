import { FC, ReactElement } from "react";

import { SCREEN_BREAKPOINTS } from "@constants/index";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import theme from "@theme";

interface FavoritesCardProps {
    title: string;
    rating: number;
    noOfReviews: number;
    imgUrl: string;
    normalPrice: number;
    reducedPrice: number;
    onClickRemove: () => void;
    onClickAddToCart: () => void;
    inStock?: boolean;
}

const FavoritesCard: FC<FavoritesCardProps> = ({
    title,
    rating,
    noOfReviews,
    imgUrl,
    normalPrice,
    reducedPrice,
    onClickRemove,
    onClickAddToCart,
    inStock = true,
}): ReactElement => {
    const matches = useMediaQuery(`(min-width:${SCREEN_BREAKPOINTS.md})`);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Stack
                direction={matches ? "row" : "column"}
                justifyContent="space-between"
            >
                <Stack
                    direction={matches ? "row" : "column"}
                    alignItems="center"
                    gap={2}
                >
                    <img
                        src={imgUrl}
                        alt="product"
                        style={{ maxWidth: "18.75rem" }}
                    />
                    <div>
                        <Typography variant="body2">{title}</Typography>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <Rating
                                name="read-only"
                                precision={0.1}
                                value={rating}
                                readOnly
                                size="small"
                            />
                            <Typography variant="caption">
                                {rating} ({noOfReviews})
                            </Typography>
                        </Stack>
                    </div>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Stack
                    alignItems={matches ? "flex-end" : "center"}
                    justifyContent="space-around"
                    gap={2}
                >
                    {inStock ? (
                        <Typography color={theme.colors.good} variant="caption">
                            In stock
                        </Typography>
                    ) : (
                        <Typography color={theme.colors.bad} variant="caption">
                            Not in stock
                        </Typography>
                    )}
                    <div>
                        <Typography
                            sx={{ textDecoration: "line-through" }}
                            variant="body2"
                        >
                            {normalPrice}$
                        </Typography>
                        <Typography variant="h6">{reducedPrice}$</Typography>
                    </div>
                    <Button variant="contained" onClick={onClickAddToCart}>
                        Add to cart
                    </Button>
                    <Button onClick={onClickRemove}>
                        <DeleteIcon fontSize="small" />
                        <Typography variant="body2">Remove</Typography>
                    </Button>
                </Stack>
            </Stack>
            <Divider light sx={{ mt: 3 }} />
        </Container>
    );
};

export default FavoritesCard;
