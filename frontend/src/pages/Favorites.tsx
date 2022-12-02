import { FC, ReactElement } from "react";

import FavoritesCard from "@components/FavoritesCard";
import { SCREEN_BREAKPOINTS } from "@constants";
import { generateIds, getMeanRatingComments } from "@helpers/helpers";
import useCart from "@hooks/products/useCart";
import useFavoriteProducts from "@hooks/products/useFavoriteProducts";
import { Product } from "@interfaces/product";
import {
    Box,
    Container,
    Divider,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const skeletonIds = generateIds(2);

const Favorites: FC = (): ReactElement => {
    const {
        isLoading,
        favoriteProducts,
        favoriteProductsNumber,
        mutateDelete
    } = useFavoriteProducts();
    const { mutateAdd } = useCart();
    const matches = useMediaQuery(`(min-width:${SCREEN_BREAKPOINTS.md})`);

    const onClickRemove = (id: number) => {
        mutateDelete(id);
    };

    const addToCart = (pid: number) => {
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
