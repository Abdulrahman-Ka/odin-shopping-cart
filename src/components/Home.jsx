// /* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import {
  Container,
  CircularProgress,
  Alert,
  Skeleton,
  Button,
  Box,
} from "@mui/material";
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // new error state

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function renderLoadingSkeletons() {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Skeleton />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 6 }}>
      {loading && renderLoadingSkeletons()}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
          <Button
            variant="outlined"
            size="small"
            sx={{ ml: 2 }}
            onClick={fetchProducts}
          >
            Retry
          </Button>
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        {products.map((product) => (
          <Box key={product.id} sx={{ width: "calc(25% - 24px)" }}>
            <ProductCard product={product} onAddToCart={addToCart} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
