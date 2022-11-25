import { FC, ReactElement } from "react";

import {
    Box,
    Skeleton,
    Container,
    Typography,
    Stack,
    Divider,
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";

import { Product } from "@interfaces/product";
import { SCREEN_BREAKPOINTS } from "@constants";
import FavoritesCard from "@components/FavoritesCard";
import useFavoriteProducts from "@hooks/products/useFavoriteProducts";
import useCart from "@hooks/products/useCart";
import { generateIds, getMeanRatingComments } from "@helpers/helpers";

const skeletonIds = generateIds(2);

const Favorites: FC = (): ReactElement => {
    const {
        isLoading,
        favoriteProducts,
        favoriteProductsNumber,
        mutateDelete,
    } = useFavoriteProducts();
    const { isLoadingAdd, mutateAdd } = useCart();
    const matches = useMediaQuery(`(min-width:${SCREEN_BREAKPOINTS.md})`);

    const onClickRemove = (id: number) => {
        mutateDelete(id);
    };

    const addToCart = (pid: number) => {
        console.log(pid);
        mutateAdd({ productId: pid, quantity: 1 });
    };

    return (
        <Container sx={{ mt: 12 }} maxWidth={matches ? "xl" : "sm"}>
            <Box
                sx={{ backgroundColor: "white", px: 8, py: 4, borderRadius: 1 }}
            >
                <Stack direction="row" gap={3} alignItems="center">
                    <Typography variant="h6">Favorites </Typography>
                    <Typography variant="body2">
                        {favoriteProductsNumber}{" "}
                        {favoriteProductsNumber === 1 ? "product" : "products"}
                    </Typography>
                </Stack>
                <Divider light />
                {isLoading &&
                    skeletonIds.map((id) => (
                        <Skeleton
                            sx={{ height: 300 }}
                            animation="wave"
                            variant="rectangular"
                            key={`skeleton-${id}`}
                        />
                    ))}
                {favoriteProducts?.length ? (
                    favoriteProducts.map(
                        ({ product, id }: { product: Product; id: number }) => (
                            <FavoritesCard
                                title={product.title}
                                rating={getMeanRatingComments(product.comments)}
                                noOfReviews={product.comments.length}
                                imgUrl={product.imgUrl}
                                normalPrice={product.price}
                                inStock={product.quantity > 0}
                                reducedPrice={product.price_with_discount}
                                onClickRemove={() => onClickRemove(id)}
                                addToCart={() => addToCart(product.pid)}
                                key={`favorite-product-${product.pid}`}
                            />
                        )
                    )
                ) : (
                    <Typography variant="h6" align="center" sx={{ my: 6 }}>
                        There are no products in favorites.{" "}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default Favorites;
