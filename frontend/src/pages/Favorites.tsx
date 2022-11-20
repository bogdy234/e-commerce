import { FC, ReactElement } from "react";

import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import FavoritesCard from "@components/FavoritesCard";

interface FavoritesProps {}

const products = [
    {
        id: 1,
        title: "Product 1",
        rating: 4.5,
        noOfReviews: 100,
        imgUrl: "https://picsum.photos/200",
        normalPrice: 100,
        inStock: true,
        reducedPrice: 50,
    },
    {
        id: 2,
        title: "Product 2",
        rating: 4.5,
        noOfReviews: 100,
        imgUrl: "https://picsum.photos/200",
        normalPrice: 100,
        reducedPrice: 50,
    },
];

const Favorites: FC<FavoritesProps> = (): ReactElement => {
    return (
        <Container sx={{ mt: 12 }}>
            <Box
                sx={{ backgroundColor: "white", px: 8, py: 4, borderRadius: 1 }}
            >
                <Stack direction="row" gap={3} alignItems="center">
                    <Typography variant="h6">Favorites </Typography>
                    <Typography variant="body2">2 products</Typography>
                </Stack>
                <Divider light />
                {products.map((product) => (
                    <FavoritesCard
                        title={product.title}
                        rating={product.rating}
                        noOfReviews={product.noOfReviews}
                        imgUrl={product.imgUrl}
                        normalPrice={product.normalPrice}
                        inStock={product.inStock || false}
                        reducedPrice={product.reducedPrice}
                        onClickRemove={() =>
                            console.log(`${product.title} removed`)
                        }
                        onClickAddToCart={() =>
                            console.log(`${product.title} added to cart`)
                        }
                        key={`favorite-product-${product.id}`}
                    />
                ))}
            </Box>
        </Container>
    );
};

export default Favorites;
