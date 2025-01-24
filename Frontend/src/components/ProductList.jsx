import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../redux/ProductSlice";
import { fetchProducts } from "../productService";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        dispatch(setProducts(productsData));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product List</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "pink", textAlign: "left" }}>
            <th
              style={{
                padding: "12px 15px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Product Name
            </th>
            <th
              style={{
                padding: "12px 15px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Price
            </th>
            <th
              style={{
                padding: "12px 15px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Quantity In Stock
            </th>
            <th
              style={{
                padding: "12px 15px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Warehouse Location
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr
              key={product.inventory.productId}
              style={{
                borderBottom: "1px solid #ddd",
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e9e9e9",
                color: "black",
              }}
            >
              <td style={{ padding: "12px 15px" }}>{product.productName}</td>
              <td style={{ padding: "12px 15px" }}>${product.price}</td>
              <td style={{ padding: "12px 15px" }}>
                {product.inventory.quantityInStock}
              </td>
              <td style={{ padding: "12px 15px" }}>
                {product.inventory.warehouseLocation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
