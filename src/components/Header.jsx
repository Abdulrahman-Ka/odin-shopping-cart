import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

Header.propTypes = {
  cartCount: PropTypes.number.isRequired,
};

export default function Header({ cartCount }) {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        boxShadow: 3,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Simple Shop Logo"
            sx={{
              height: 60,
              width: 60,
              mr: 1,
            }}
          />
          <Typography variant="h3" fontWeight="bold">
            Simple Shop
          </Typography>
        </Box>

        {/* Nav Links + Cart */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Home
          </Button>

          <IconButton
            color="inherit"
            component={Link}
            to="/cart"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
