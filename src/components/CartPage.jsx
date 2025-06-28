import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PropTypes from "prop-types";

CartPage.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      qty: PropTypes.number.isRequired,
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func,
  clearCart: PropTypes.func,
};

export default function CartPage({
  cartItems,
  removeFromCart,
  updateQuantity,
  clearCart,
}) {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <Grid item xs={12} width={"100%"} key={item.id}>
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: "contain",
                      mr: 2,
                      borderRadius: 2,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.qty - 1))
                        }
                        disabled={item.qty <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.qty}</Typography>
                      <IconButton
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                        mt: 2,
                      }}
                    >
                      <Typography variant="subtitle1">
                        Total: ${(item.qty * item.price).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box display="flex" justifyContent="center" gap={2}>
            <Typography variant="h5" fontWeight="bold">
              Total: ${total.toFixed(2)}
            </Typography>
            <Button variant="contained" color="primary">
              Checkout
            </Button>
            <Button variant="outlined" color="warning" onClick={clearCart}>
              Clear Cart
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}
