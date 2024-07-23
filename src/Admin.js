import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    Name: "",
    Image: null,
    Descriptione: "",
    Price: "",
  });
  const [currentProduct, setCurrentProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get("http://localhost/Sql%20pfe/product.php")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error(
            "Data received from server is not an array:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data from server:", error);
      });
  };

  const handleAddToCart = () => {
    navigate("/in8");
  };

  const handleOpenAddDialog = () => {
    setNewProduct({
      Name: "",
      Image: null,
      Descriptione: "",
      Price: "",
    });
    setOpen(true);
  };

  const handleOpenEditDialog = (product) => {
    setCurrentProduct(product);
    setNewProduct({
      Name: product.Name,
      Image: null,
      Descriptione: product.Descriptione,
      Price: product.Price,
    });
    setEditOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "Image") {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: files[0],
      }));
    } else {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleSaveProduct = () => {
    const formData = new FormData();
    formData.append("Image", newProduct.Image);
    formData.append("Name", newProduct.Name);
    formData.append("Descriptione", newProduct.Descriptione);
    formData.append("Price", newProduct.Price);

    axios
      .post("http://localhost/Sql%20pfe/product.php", formData)
      .then((res) => {
        getProducts();
        handleCloseDialog();
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const handleUpdateProduct = () => {
    const formData = new FormData();
    formData.append("Product_ID", currentProduct.Product_ID);
    formData.append("Name", newProduct.Name);
    formData.append("Descriptione", newProduct.Descriptione);
    formData.append("Price", newProduct.Price);
    if (newProduct.Image) {
      formData.append("Image", newProduct.Image);
    }

    axios
      .post("http://localhost/Sql%20pfe/index.php", formData)
      .then((res) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.Product_ID === currentProduct.Product_ID
              ? { ...product, ...newProduct, Image: product.Image }
              : product
          )
        );
        handleCloseDialog();
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleDeleteProduct = (productId) => {
    axios
      .delete(`http://localhost/Sql%20pfe/product.php?productId=${productId}`)
      .then((res) => {
        getProducts();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <>
      <Nav />
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          size="large"
          color="primary"
          sx={{
            color: "#632D18",
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: "Gill Sans Ultra Bold",
            border: "solid 2px #632D18",
            padding: "20px",
          }}
          onClick={handleOpenAddDialog}
        >
          Add New Product
        </Button>
      </Box>
      <Grid
        container
        spacing={1}
        columns={24}
        sx={{ height: "auto", marginTop: "20px" }}
      >
        {products.map((product) => (
          <Grid item xs={8} key={product.Product_ID}>
            <Card
              sx={{
                maxWidth: 345,
                marginLeft: "30px",
                marginTop: "20px",
                height: "450px",
                backgroundColor: "#C8905E",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="280"
                  image={"http://localhost/Sql%20pfe/uploads/" + product.Image}
                  alt={product.Name}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      color: "#632D18",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Gill Sans Ultra Bold",
                    }}
                  >
                    {product.Name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      color: "#632D18",
                      fontFamily: "Gill Sans Ultra Bold",
                    }}
                  >
                    {product.Descriptione} <br /> {product.Price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  size="small"
                  color="primary"
                  sx={{
                    color: "#632D18",
                    fontSize: "15px",
                    fontWeight: "bold",
                    fontFamily: "Gill Sans Ultra Bold",
                    border: "solid 2px #632D18",
                    marginTop: "-13px",
                    width: "100px",
                    height: "40px",
                  }}
                  onClick={handleAddToCart}
                >
                  Add Cart
                </Button>
                <Button
                  size="small"
                  color="primary"
                  sx={{
                    color: "#632D18",
                    fontSize: "15px",
                    fontWeight: "bold",
                    fontFamily: "Gill Sans Ultra Bold",
                    border: "solid 2px #632D18",
                    marginTop: "-13px",
                    marginLeft: "10px",
                    width: "100px",
                    height: "40px",
                  }}
                  onClick={() => handleOpenEditDialog(product)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="primary"
                  sx={{
                    color: "#632D18",
                    fontSize: "15px",
                    fontWeight: "bold",
                    fontFamily: "Gill Sans Ultra Bold",
                    border: "solid 2px #632D18",
                    marginTop: "-13px",
                    marginLeft: "10px",
                    width: "100px",
                    height: "40px",
                  }}
                  onClick={() => handleDeleteProduct(product.Product_ID)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add New Product Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="Name"
            label="Product Name"
            type="text"
            fullWidth
            variant="standard"
            value={newProduct.Name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Image"
            label="Image"
            type="file"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Descriptione"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={newProduct.Descriptione}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Price"
            label="Price"
            type="text"
            fullWidth
            variant="standard"
            value={newProduct.Price}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveProduct}>Add Product</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={editOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="Name"
            label="Product Name"
            type="text"
            fullWidth
            variant="standard"
            value={newProduct.Name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Image"
            label="Image"
            type="file"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Descriptione"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={newProduct.Descriptione}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="Price"
            label="Price"
            type="text"
            fullWidth
            variant="standard"
            value={newProduct.Price}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateProduct}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
