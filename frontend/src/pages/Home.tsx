import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { Container, Grid, Typography } from "@mui/material";

import useProducts from "@hooks/products/useProducts";
import useFavoriteProducts from "@hooks/products/useFavoriteProducts";
import ProductCard from "@components/ProductCard";
import useUser from "@hooks/user/useUser";
import { TOAST_PROPERTIES } from "@constants/index";

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
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                icon: <FavoriteIcon />,
            });
        } else {
            mutateAdd(id);
            toast.success("Product was added to your favorites.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                icon: <FavoriteIcon sx={{ color: "red" }} />,
            });
        }
    };

    console.log(favoriteProducts);

    return (
        <Container sx={{ mt: 12 }} maxWidth={false}>
            {isLoading && <Typography variant="h1">Loading...</Typography>}
            {error && (
                <Typography variant="h1" color="red">
                    Error
                </Typography>
            )}
            <Grid container spacing={4} justifyContent="center">
                {data?.map(
                    ({ pid, title, price, price_with_discount, imgUrl }) => (
                        <Grid item key={`product-${pid}`}>
                            <ProductCard
                                title={title}
                                rating={0}
                                price={price}
                                reducedPrice={price_with_discount}
                                imgSrc={imgUrl}
                                toggleFavorite={() => toggleFavorite(pid)}
                                isFavorite={isFavorite(pid)}
                            />
                        </Grid>
                    )
                )}
            </Grid>
        </Container>
    );
};

export default Home;
