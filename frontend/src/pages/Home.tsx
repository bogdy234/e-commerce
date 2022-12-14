import { FC } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "@components/ProductCard";
import { RESET_CATEGORY, RESET_SEARCH } from "@constants/search";
import { generateIds, getMeanRatingComments } from "@helpers/helpers";
import useCart from "@hooks/products/useCart";
import useFavoriteProducts from "@hooks/products/useFavoriteProducts";
import useProducts from "@hooks/products/useProducts";
import useSearch from "@hooks/search/useSearch";
import useUser from "@hooks/user/useUser";
import {
    Button,
    Container,
    Grid,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";

const skeletonIds = generateIds(10);

const Home: FC = () => {
    const navigate = useNavigate();
    const { state } = useUser();
    const {
        state: { searchData, category },
        dispatch: dispatchSearch
    } = useSearch();

    const { isLoading, error, data } = useProducts();
    const { mutateAdd, favoriteProducts, mutateDelete } = useFavoriteProducts();
    const { mutateAdd: mutateAddCart } = useCart();

    const isFavorite = (pid: number) => {
        return favoriteProducts
            ?.map((favorite) => favorite.product.pid)
            .includes(pid);
    };

    const toggleFavorite = (id: number) => {
        if (!state?.token) {
            navigate("/signin");
            return;
        }
        const favoriteProductId = favoriteProducts?.filter(
            (favorite) => favorite.product.pid === id
        )[0]?.id;
        if (favoriteProductId) {
            mutateDelete(favoriteProductId);
        } else {
            mutateAdd(id);
        }
    };

    const addToCart = (pid: number) =>
        mutateAddCart({ productId: pid, quantity: 1 });

    const removeTitleSearch = () => dispatchSearch({ type: RESET_SEARCH });

    const removeCategoryFilter = () => dispatchSearch({ type: RESET_CATEGORY });

    return (
        <Container sx={{ mt: 16, pb: 12 }} maxWidth="lg">
            {error && (
                <Typography variant="h1" color="red">
                    Error
                </Typography>
            )}
            {(category || searchData) && (
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                    sx={{ mb: 6 }}
                >
                    {searchData && (
                        <Stack direction="row" spacing={2}>
                            <Typography variant="h5">
                                Current search title: {searchData}
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={removeTitleSearch}
                            >
                                Remove title filter
                            </Button>
                        </Stack>
                    )}
                    {category && (
                        <Stack direction="row" spacing={2}>
                            <Typography variant="h5">
                                Current category: {category}
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={removeCategoryFilter}
                            >
                                Remove category filter
                            </Button>
                        </Stack>
                    )}
                </Stack>
            )}
            <Grid container spacing={4} justifyContent="center">
                {isLoading &&
                    skeletonIds.map((id) => (
                        <Grid item key={`skeleton-${id}`}>
                            <Skeleton
                                sx={{ width: 345, height: 300 }}
                                animation="wave"
                                variant="rectangular"
                            />
                        </Grid>
                    ))}
                {data?.map(
                    ({
                        pid,
                        title,
                        price,
                        price_with_discount,
                        imgUrl,
                        quantity,
                        comments
                    }) => (
                        <Grid item key={`product-${pid}`}>
                            <ProductCard
                                title={title}
                                rating={getMeanRatingComments(comments)}
                                noOfReviews={comments.length}
                                price={price}
                                reducedPrice={price_with_discount}
                                imgSrc={imgUrl}
                                isFavorite={isFavorite(pid)}
                                toggleFavorite={() => toggleFavorite(pid)}
                                addToCart={() => addToCart(pid)}
                                inStock={quantity > 0}
                            />
                        </Grid>
                    )
                )}
            </Grid>
        </Container>
    );
};

export default Home;
