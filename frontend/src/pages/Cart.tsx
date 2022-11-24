import { FC } from "react";
import { Container, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Product } from "@interfaces/product";
import { SCREEN_BREAKPOINTS } from "@constants";
import CartCard from "@components/CartCard";
import useCart from "@hooks/products/useCart";
import { getMeanRatingComments } from "@helpers/helpers";
import { Skeleton } from "@mui/material";
import useFavoriteProducts from "@hooks/products/useFavoriteProducts";

const skeletonIds = [1, 2];

const Cart: FC = () => {
    const {
        isLoading,
        cartProducts,
        cartProductsNumber,
        mutateDelete: mutateDeleteCart,
    } = useCart();
    const { mutateAdd } = useFavoriteProducts();

    const matches = useMediaQuery(`(min-width:${SCREEN_BREAKPOINTS.md})`);

    const onClickRemove = (id: number) => {
        mutateDeleteCart(id);
    };

    const moveToFavorites = (pid: number, cartId: number) => {
        mutateAdd(pid);
        mutateDeleteCart(cartId);
    };

    return (
        <Container sx={{ mt: 12 }} maxWidth={matches ? "xl" : "sm"}>
            <Box
                sx={{ backgroundColor: "white", px: 8, py: 4, borderRadius: 1 }}
            >
                <Stack direction="row" gap={3} alignItems="center">
                    <Typography variant="h6">Cart</Typography>
                    <Typography variant="body2">
                        {cartProductsNumber}{" "}
                        {cartProductsNumber === 1 ? "product" : "products"}
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
                {cartProducts?.map(
                    ({ product, id }: { product: Product; id: number }) => (
                        <CartCard
                            title={product.title}
                            rating={getMeanRatingComments(product.comments)}
                            noOfReviews={product?.comments?.length || 0}
                            imgUrl={product.imgUrl}
                            normalPrice={product.price}
                            inStock={product.quantity > 0}
                            reducedPrice={product.price_with_discount}
                            onClickRemove={() => onClickRemove(id)}
                            moveToFavorites={() =>
                                moveToFavorites(product.pid, id)
                            }
                            key={`favorite-product-${product.pid}`}
                        />
                    )
                )}
            </Box>
        </Container>
    );
};

export default Cart;
