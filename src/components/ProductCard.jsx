import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { PropTypes } from "prop-types";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) setQuantity(value);
  };

  const handleAddToCart = () => {
    onAddToCart({ ...product, qty: quantity });
    setQuantity(1);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale(1.02)", boxShadow: 6 },
      }}
    >
      <Box sx={{ p: 2 }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            objectFit: "contain",
            height: 200,
            mx: "auto",
            maxWidth: "100%",
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          sx={{ minHeight: 60 }}
        >
          {product.title.length > 50
            ? product.title.substring(0, 50) + "..."
            : product.title}
        </Typography>
        <Typography variant="body2" color="secondary" sx={{ mb: 1 }}>
          {product.category.toUpperCase()}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "center",
          pb: 2,
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small" onClick={handleDecrement}>
            <RemoveIcon />
          </IconButton>
          <TextField
            type="number"
            size="small"
            value={quantity}
            onChange={handleChange}
            inputProps={{ min: 1, style: { textAlign: "center", width: 40 } }}
          />
          <IconButton size="small" onClick={handleIncrement}>
            <AddIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddToCart}
          sx={{ borderRadius: 2, fontWeight: "bold" }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
