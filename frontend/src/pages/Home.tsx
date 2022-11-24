import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { Container, Grid, Skeleton, Typography } from "@mui/material";

import useProducts from "@hooks/products/useProducts";
import useFavoriteProducts from "@hooks/products/useFavoriteProducts";
import ProductCard from "@components/ProductCard";
import useUser from "@hooks/user/useUser";
import { getMeanRatingComments } from "@helpers/helpers";

const skeletonIds = [1, 2, 3, 4, 5, 6];

const Home: FC = () => {
    const navigate = useNavigate();
    const { state } = useUser();
    const { isLoading, error, data } = useProducts();
    const { mutateAdd, favoriteProducts, mutateDelete } = useFavoriteProducts();

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
            toast.success("Product was removed from your favorites.", {
                icon: <FavoriteIcon />,
            });
        } else {
            mutateAdd(id);
            toast.success("Product was added to your favorites.", {
                icon: <FavoriteIcon sx={{ color: "red" }} />,
            });
        }
    };

    return (
        <Container sx={{ mt: 12, pb: 12 }} maxWidth={false}>
            {error && (
                <Typography variant="h1" color="red">
                    Error
                </Typography>
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
                        comments,
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
                                addToCart={() => {}}
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
