import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Nav from "./Nav";

function Import() {
  const [productName, setProductName] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productId, setProductId] = useState("");

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleProductIdChange = (event) => {
    setProductId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", file);
    formData.append("product_id", productId);

    axios
      .post("http://localhost/Sql%20pfe/updateProduct.php", formData)
      .then((response) => {
        console.log(response.data);
        window.location.href = "/in10";
      })
      .catch((error) => {
        console.error("There was an error updating the product!", error);
      });
  };

  const formStyle = {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "10px",
    border: "1px solid #632D18",
    color: "#632D18",
    fontWeight: "bold",
    borderRadius: "10px",
    backgroundColor: "#C8905E",
  };

  const labelStyle = {
    display: "block",
    color: "#632D18",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "1px solid #632D18",
    color: "#632D18",
  };

  const textareaStyle = {
    width: "100%",
    padding: "8px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "vertical",
    color: "#632D18",
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#632D18",
    color: "#FAEBD7",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={{ backgroundColor: "#E2CFAB", minHeight: "100vh" }}>
      <Nav />
      <div style={formStyle}>
        <h2>Edit the Product</h2>
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>
            Product ID
            <input
              type="text"
              value={productId}
              onChange={handleProductIdChange}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Product Name
            <input
              type="text"
              value={productName}
              onChange={handleProductNameChange}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Image
            <input type="file" onChange={handleFileChange} style={inputStyle} />
          </label>
          <label style={labelStyle}>
            Description
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              style={textareaStyle}
            ></textarea>
          </label>
          <label style={labelStyle}>
            Price
            <input
              type="number"
              value={price}
              onChange={handlePriceChange}
              style={inputStyle}
            />
          </label>
          <button type="submit" style={buttonStyle}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Import;
