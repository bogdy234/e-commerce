import { FC, ReactElement, useState } from "react";

import { SCREEN_BREAKPOINTS } from "@constants/index";

import DeleteIcon from "@mui/icons-material/Delete";

import {
    Button,
    Typography,
    Divider,
    Rating,
    Stack,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Container,
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";

import theme from "@theme";
import Price from "@components/Price";
import useCart from "@hooks/products/useCart";
import { generateIds } from "@helpers/helpers";

interface CartCardProps {
    id: number;
    title: string;
    rating: number;
    noOfReviews: number;
    imgUrl: string;
    normalPrice: number;
    reducedPrice: number;
    onClickRemove: () => void;
    moveToFavorites: () => void;
    inStock?: boolean;
    quantity: number;
    productQuantity: number;
}

const CartCard: FC<CartCardProps> = ({
    id,
    title,
    rating,
    noOfReviews,
    imgUrl,
    normalPrice,
    reducedPrice,
    onClickRemove,
    moveToFavorites,
    inStock = true,
    quantity,
    productQuantity,
}): ReactElement => {
    const matches = useMediaQuery(`(min-width:${SCREEN_BREAKPOINTS.md})`);
    const { mutateEdit } = useCart();

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
                        normalPrice={quantity * normalPrice}
                        reducedPrice={quantity * reducedPrice}
                    />
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                            Quantity
                        </InputLabel>
                        <Select
                            labelId="quantity-product"
                            id="quantity"
                            value={quantity}
                            label="Quantity"
                            onChange={(e) =>
                                mutateEdit({
                                    cartId: id,
                                    productQuantity: e.target.value as number,
                                })
                            }
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        maxHeight: 500,
                                    },
                                },
                            }}
                        >
                            {generateIds(productQuantity, 1, false).map((v) => (
                                <MenuItem value={v} key={v}>
                                    {v}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
