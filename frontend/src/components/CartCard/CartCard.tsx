import { FC, ReactElement } from "react";

import { SCREEN_BREAKPOINTS } from "@constants/index";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";

import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import theme from "@theme";
import Price from "@components/Price";

interface CartCardProps {
    title: string;
    rating: number;
    noOfReviews: number;
    imgUrl: string;
    normalPrice: number;
    reducedPrice: number;
    onClickRemove: () => void;
    moveToFavorites: () => void;
    inStock?: boolean;
}

const CartCard: FC<CartCardProps> = ({
    title,
    rating,
    noOfReviews,
    imgUrl,
    normalPrice,
    reducedPrice,
    onClickRemove,
    moveToFavorites,
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
                        <Typography
                            variant="body2"
                            align={matches ? "left" : "center"}
                        >
                            {title}
                        </Typography>
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

                    <Price
                        normalPrice={normalPrice}
                        reducedPrice={reducedPrice}
                    />

                    <Button variant="contained" onClick={moveToFavorites}>
                        <Stack direction="row" gap={1}>
                            Move to favorites
                        </Stack>
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

export default CartCard;
