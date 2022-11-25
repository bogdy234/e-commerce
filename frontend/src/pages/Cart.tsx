import { FC } from "react";
import { Button, Container, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";

import { CartProduct } from "@interfaces/product";
import { SCREEN_BREAKPOINTS } from "@constants";
import CartCard from "@components/CartCard";
import useCart from "@hooks/products/useCart";
import { generateIds, getMeanRatingComments } from "@helpers/helpers";
import { Skeleton } from "@mui/material";
import useFavoriteProducts from "@hooks/products/useFavoriteProducts";
import { useNavigate } from "react-router-dom";

const skeletonIds = generateIds(2);

const Cart: FC = () => {
    const navigate = useNavigate();
    const {
        isLoading,
        cartProducts,
        cartProductsNumber,
        mutateDelete: mutateDeleteCart,
        totalAmount,
        totalAmountDiscount,
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

    const getPrice = (total: number, reducedTotal: number) => {
        if (total === 0) {
            return (
                <Typography variant="h4" align="center">
                    There are no products in cart.
                </Typography>
            );
        }
        if (total === reducedTotal) {
            return (
                <Typography variant="h4" align="center">
                    Total: {total}$
                </Typography>
            );
        }
        return (
            <>
                <Typography
                    variant="h5"
                    align="center"
                    sx={{ textDecoration: "line-through" }}
                >
                    Total: {total}$
                </Typography>
                <Typography variant="h4" align="center">
                    Total: {reducedTotal}$
                </Typography>
                <Typography variant="h4" color="#d72029" align="center">
                    You save: {total - reducedTotal}$
                </Typography>
            </>
        );
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
                    ({ product, id, product_quantity }: CartProduct) => (
                        <CartCard
                            id={id}
                            title={product.title}
                            rating={getMeanRatingComments(product.comments)}
                            noOfReviews={product?.comments?.length || 0}
                            imgUrl={product.imgUrl}
                            normalPrice={product.price}
                            inStock={product.quantity > 0}
                            productQuantity={product.quantity}
                            reducedPrice={product.price_with_discount}
                            onClickRemove={() => onClickRemove(id)}
                            moveToFavorites={() =>
                                moveToFavorites(product.pid, id)
                            }
                            quantity={product_quantity}
                            key={`favorite-product-${product.pid}`}
                        />
                    )
                )}
                <Stack>
                    <Box sx={{ m: 10 }}>
                        {getPrice(totalAmount, totalAmountDiscount)}
                    </Box>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate("/checkout")}
                    >
                        Proceed to checkout
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
};

export default Cart;
