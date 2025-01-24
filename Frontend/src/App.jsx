import React from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",

        padding: "20px",
      }}
    >
      <h1>Product Management</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
}

export default App;
