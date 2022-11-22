import { FC, ReactElement } from "react";

import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Product } from "@interfaces/product";
import { SCREEN_BREAKPOINTS } from "@constants";
import FavoritesCard from "@components/FavoritesCard";
import useFavoriteProducts from "@hooks/products/useFavoriteProducts";

// const products = [
//     {
//         id: 1,
//         title: "Product 1",
//         rating: 4.5,
//         noOfReviews: 100,
//         imgUrl: "https://picsum.photos/200",
//         normalPrice: 100,
//         inStock: true,
//         reducedPrice: 50,
//     },
//     {
//         id: 2,
//         title: "Product 2",
//         rating: 4.5,
//         noOfReviews: 100,
//         imgUrl: "https://picsum.photos/200",
//         normalPrice: 100,
//         reducedPrice: 50,
//     },
// ];

const Favorites: FC = (): ReactElement => {
    const {
        isLoading,
        favoriteProducts,
        favoriteProductsNumber,
        mutateDelete,
        isLoadingDelete,
    } = useFavoriteProducts();
    const matches = useMediaQuery(`(min-width:${SCREEN_BREAKPOINTS.md})`);

    const onClickRemove = (id: number) => {
        mutateDelete(id);
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
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    favoriteProducts?.map(
                        ({ product, id }: { product: Product; id: number }) => (
                            <FavoritesCard
                                title={product.title}
                                rating={product.rating || 5}
                                noOfReviews={product.noOfReviews || 0}
                                imgUrl={product.imgUrl}
                                normalPrice={product.price}
                                inStock={product.quantity > 0}
                                reducedPrice={product.price_with_discount}
                                onClickRemove={() => onClickRemove(id)}
                                onClickAddToCart={() =>
                                    console.log(
                                        `${product.title} added to cart`
                                    )
                                }
                                key={`favorite-product-${product.pid}`}
                            />
                        )
                    )
                )}
            </Box>
        </Container>
    );
};

export default Favorites;
