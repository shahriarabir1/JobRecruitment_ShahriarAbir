import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../productService";
import { setProducts } from "../redux/ProductSlice";
import { fetchProducts } from "../productService";
import { TextField, Button, Box, Typography } from "@mui/material";

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantityInStock, setQuantityInStock] = useState("");
  const [warehouseLocation, setWarehouseLocation] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      productName,
      price: parseFloat(price),
      inventory: {
        quantityInStock: parseInt(quantityInStock, 10),
        warehouseLocation,
      },
    };

    try {
      await createProduct(newProduct);

      const updatedProducts = await fetchProducts();
      dispatch(setProducts(updatedProducts));

      setProductName("");
      setPrice("");
      setQuantityInStock("");
      setWarehouseLocation("");
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ marginBottom: 2, color: "black" }}
      >
        Add New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Quantity In Stock"
          variant="outlined"
          fullWidth
          type="number"
          value={quantityInStock}
          onChange={(e) => setQuantityInStock(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Warehouse Location"
          variant="outlined"
          fullWidth
          value={warehouseLocation}
          onChange={(e) => setWarehouseLocation(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ padding: "10px", fontSize: "16px" }}
        >
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
