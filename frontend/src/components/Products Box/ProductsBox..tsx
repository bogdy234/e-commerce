import { FC} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Container } from "@mui/material";

const data = [
  {  label: 'Laptops' },
  {  label: 'Smartphones' },
  {  label: 'PC`s' },
  {  label: 'TV`s' },
  {  label: 'Products for house' },
  {  label: 'Toys' },
  {  label: 'Clothing' },
  {  label: 'Decorations' },
  {  label: 'Health Care' },
  {  label: 'Shoes' },
  {  label: 'Games' },
  {  label: 'Furniture' },
  {  label: 'Clothing' },
  {  label: 'Clothing' },
  {  label: 'Clothing' },
  {  label: 'Clothing' },
  {  label: 'Clothing' },

];

interface ProductBoxProps {}

const ProductBox: FC<ProductBoxProps> = () => {

    return (
      <Container sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Container sx={{ display: 'grid', gap:'30px', gridTemplateColumns:'repeat(3,1fr)',gridAutoRows:'auto',justifyContent:'space-between'}}>
        {data.map((item) => (
        <Card sx={{ maxWidth: '345px',minWidth:'300px' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="160"
            image="../src/assets/heseba.jpg"
            alt="he seba"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {item.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              He Seba
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      ))}

      </Container>
      </Container>
    );
};

export default ProductBox;
