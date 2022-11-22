import { FC } from "react";

import {
    Card,
    CardMedia,
    CardHeader,
    CardContent,
    CardActions,
    IconButton,
    Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

interface ProductCard {
    title: string;
    rating: number;
    price: number;
    reducedPrice: number;
    imgSrc: string;
    toggleFavorite: () => void;
    isFavorite: boolean;
}

const ProductCard: FC<ProductCard> = ({
    title,
    rating,
    price,
    reducedPrice,
    imgSrc,
    toggleFavorite,
    isFavorite,
}) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
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
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfectawkfwaofj awjf awijfi
                    awjfiawj fiawjfi ajfiaj iwjfiajw iajw ifj awijfaiowj faoiwjf
                    owaijf aoiwjf iwoajf aiwjf oiwajfoi ajfioawjf ioaw party
                    dish and a fun meal to cook together with your guests. Add 1
                    cup of frozen peas along with the mussels, if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
