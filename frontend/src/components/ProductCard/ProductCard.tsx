import { FC } from "react";

import {
    Card,
    CardMedia,
    CardHeader,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Button,
    Stack,
    Rating,
    useMediaQuery,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Price from "@components/Price";
import theme from "@theme";
import { SCREEN_BREAKPOINTS } from "@constants/index";

interface ProductCard {
    title: string;
    rating: number;
    noOfReviews: number;
    price: number;
    reducedPrice: number;
    imgSrc: string;
    toggleFavorite: () => void;
    addToCart: () => void;
    isFavorite: boolean;
    inStock: boolean;
}

const ProductCard: FC<ProductCard> = ({
    title,
    rating,
    noOfReviews,
    price,
    reducedPrice,
    imgSrc,
    toggleFavorite,
    addToCart,
    isFavorite,
    inStock,
}) => {
    const matches = useMediaQuery(`(min-width:${SCREEN_BREAKPOINTS.xs})`);

    return (
        <Card sx={{ width: 340, height: 470 }}>
            <CardHeader
                action={
                    <IconButton
                        aria-label="toggle favorites"
                        onClick={toggleFavorite}
                    >
                        <FavoriteIcon sx={{ color: isFavorite ? "red" : "" }} />
                    </IconButton>
                }
                title={title}
            />
            <CardMedia
                component="img"
                height="194"
                image={imgSrc}
                alt="product-image"
            />
            <CardContent>
                <div>
                    <Typography variant="body2">{title}</Typography>
                    <Stack direction="row" gap={1}>
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
                {inStock ? (
                    <Typography color={theme.colors.good} variant="caption">
                        In stock
                    </Typography>
                ) : (
                    <Typography color={theme.colors.bad} variant="caption">
                        Not in stock
                    </Typography>
                )}
            </CardContent>
            <Stack direction="row" spacing={2} justifyContent="center">
                <CardActions sx={{ p: 3 }}>
                    <Stack
                        direction="row"
                        spacing={matches ? 6 : 4}
                        alignItems="center"
                    >
                        <Price
                            normalPrice={price}
                            reducedPrice={reducedPrice}
                        />
                        <Button
                            variant="contained"
                            onClick={addToCart}
                            sx={{ height: 52 }}
                        >
                            <Stack direction="row" gap={1} alignItems="center">
                                <ShoppingCartIcon />
                                Add to cart
                            </Stack>
                        </Button>
                    </Stack>
                </CardActions>
            </Stack>
        </Card>
    );
};

export default ProductCard;
