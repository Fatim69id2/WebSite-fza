import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  TextField,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import "./App.css";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function Product() {
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [hovers, setHovers] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem("isloged"));
    if (!isLogged) {
      navigate("/");
    } else {
      setIsLoggedIn(true);
      getProducts();
    }
  }, [navigate]);

  function getProducts() {
    axios
      .get("http://localhost/Sql%20pfe/product.php")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }

  const handleAddToCart = (id) => {
    navigate("/in8/" + id);
  };

  const handleAddReview = (productId) => {
    const rating = ratings[productId] || 2;
    const comment = comments[productId] || "";
    axios
      .post("http://localhost/Sql%20pfe/Review.php", {
        Product_ID: productId,
        ID_Customer: 1,
        Rating: rating,
        Comment: comment,
      })
      .then((response) => {
        console.log(response);
        getProducts();
      })
      .catch((error) => {
        console.error("Error adding review:", error);
      });
  };

  const handleRatingChange = (productId, newValue) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: newValue,
    }));
  };

  const handleCommentChange = (productId, newComment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [productId]: newComment,
    }));
  };

  const handleHoverChange = (productId, newHover) => {
    setHovers((prevHovers) => ({
      ...prevHovers,
      [productId]: newHover,
    }));
  };

  if (!isLoggedIn) return null;

  return (
    <>
      <Nav />
      <Grid
        container
        spacing={1}
        columns={{ xs: 8, sm: 12, md: 24 }}
        sx={{ height: "auto" }}
      >
        {products.map((product, index) => (
          <Grid item xs={8} key={index}>
            <Card
              sx={{
                maxWidth: 345,
                marginLeft: "30px",
                marginTop: "20px",
                height: "auto",
                backgroundColor: "#C8905E",
                position: "relative",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="280"
                  image={`http://localhost/Sql%20pfe/uploads/${product.Image}`}
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
                    {product.Descriptione} <br /> €{product.Price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  size="small"
                  color="primary"
                  sx={{
                    color: "#632D18",
                    fontSize: "15px",
                    fontWeight: "bold",
                    border: "solid 2px #632D18",
                    textTransform: "capitalize",
                    fontFamily: "Georgia ,serif",
                    transition: "background-color 0.3s, color 0.3s",
                    "&:hover": {
                      backgroundColor: "#7f3f23",
                      color: "#fff",
                    },
                  }}
                  onClick={() => handleAddToCart(product.Product_ID)}
                >
                  Add To Cart
                </Button>
              </CardActions>
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <Rating
                  name={`hover-feedback-${product.Product_ID}`}
                  value={ratings[product.Product_ID] || 2}
                  precision={0.5}
                  sx={{ color: "#632D18" }}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) =>
                    handleRatingChange(product.Product_ID, newValue)
                  }
                  onChangeActive={(event, newHover) =>
                    handleHoverChange(product.Product_ID, newHover)
                  }
                  emptyIcon={
                    <StarIcon
                      style={{ opacity: 0.55, color: "#632D18" }}
                      fontSize="inherit"
                    />
                  }
                />
                {ratings[product.Product_ID] !== null && (
                  <Box sx={{ ml: 2, color: "#632D18" }}>
                    {
                      labels[
                        hovers[product.Product_ID] !== undefined
                          ? hovers[product.Product_ID]
                          : ratings[product.Product_ID]
                      ]
                    }
                  </Box>
                )}
              </Box>
              <Box sx={{ p: 2, color: "#632D18" }}>
                <TextField
                  fullWidth
                  label="Leave a comment"
                  value={comments[product.Product_ID] || ""}
                  onChange={(e) =>
                    handleCommentChange(product.Product_ID, e.target.value)
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    color: "	#FAEBD7",
                    background: "#632D18",
                    textTransform: "capitalize",
                    fontFamily: "Georgia ,serif",
                  }}
                  onClick={() => handleAddReview(product.Product_ID)}
                >
                  Submit Review
                </Button>
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6"></Typography>
                {product.reviews &&
                  product.reviews.map((review, i) => (
                    <Box key={i} sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        {review.Comment} - {review.Rating} Stars
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Reviewed on {review.ReviewDate}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
