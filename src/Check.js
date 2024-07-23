import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./Nav";
import {
  alpha,
  styled,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import {
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EB442C",
    },
  },
});

const CustomInput = styled(TextField)(({ theme }) => ({
  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
    height: "33px",
    width: "100%",
    borderRadius: "10px",
    marginBottom: "10px",
    backgroundColor: "transparent",
  },
}));

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Check() {
  const [UserName, setUserName] = useState("");
  const [CVV, setCVV] = useState("");
  const [ExpirationDate, setExpirationDate] = useState("");
  const [Address, setAddress] = useState("");
  const [PaymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem("isloged"));
    if (!isLogged) {
      navigate("/");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (PaymentMethod === "Cart") {
      try {
        const response = await axios.post(
          "http://localhost/Sql%20pfe/payment.php",
          {
            Order_ID: 1,
            PaymentMethod: "Cart",
            PaymentDate: new Date().toISOString(),
            Quantity: 1,
          }
        );
        console.log(response.data);
        alert("Product added to cart");
      } catch (error) {
        console.error("Error adding product to cart:", error);
        alert("Failed to add product to cart");
      }
    }
    if (PaymentMethod === "Cash on Delivery") {
      try {
        const response = await axios.post(
          "http://localhost/Sql%20pfe/payment.php",
          {
            Order_ID: 1,
            PaymentMethod: "Cash on Delivery",
            PaymentDate: new Date().toISOString(),
          }
        );
        console.log(response.data);
        alert("Product added to cart");
      } catch (error) {
        console.error("Error adding product to cart:", error);
        alert("Failed to add product to cart");
      }
    } else {
      alert(
        `Owner Name: ${UserName}\nCVV: ${CVV}\nExpiration Date: ${ExpirationDate}\nAddress: ${Address}\nPayment Method: ${PaymentMethod}`
      );
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: "#e2cfab", minHeight: "156vh" }}>
        <Nav />
        <Grid
          container
          spacing={2}
          sx={{
            borderRadius: "10px",
            width: "650px",
            height: "auto",
            position: "relative",
            top: "20px",
            left: "300px",
            backgroundColor: "#C8905E",
            border: "solid #632D18",
            padding: "20px",
          }}
        >
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{
                color: "#632D18",
                marginBottom: "20px",
                fontSize: "37px",
                fontFamily: "Georgia ,serif",
                fontWeight: "bold",
              }}
            >
              Checkout
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit} id="form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomInput
                  type="text"
                  id="UserName"
                  placeholder="Owner Name"
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
                  variant="outlined"
                  sx={{ bgcolor: "#E2CFAB", borderRadius: "5px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInput
                  type="text"
                  id="Address"
                  placeholder="Address"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                  variant="outlined"
                  sx={{ bgcolor: "#E2CFAB", borderRadius: "5px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  component="fieldset"
                  sx={{
                    bgcolor: "#E2CFAB",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <FormLabel
                    component="legend"
                    sx={{ color: "#632D18", fontSize: "20px", width: "200px" }}
                  >
                    Payment Method
                  </FormLabel>
                  <RadioGroup
                    aria-label="payment-method"
                    name="payment-method"
                    value={PaymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <FormControlLabel
                      value="Cart"
                      control={<Radio sx={{ color: "#632D18" }} />}
                      label="Cart"
                      sx={{ color: "#632D18" }}
                    />
                    <FormControlLabel
                      value="Cash on Delivery"
                      control={<Radio sx={{ color: "#632D18" }} />}
                      label="Cash on Delivery"
                      sx={{ color: "#632D18" }}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {PaymentMethod === "Cart" && (
                <Grid item xs={12}>
                  <FormControl
                    component="fieldset"
                    sx={{
                      bgcolor: "#E2CFAB",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <FormLabel
                      component="legend"
                      sx={{ color: "#632D18", width: "200px" }}
                    >
                      Payment Options
                    </FormLabel>
                    <RadioGroup
                      aria-label="payment-options"
                      name="payment-options"
                      value={CVV}
                      onChange={(e) => setCVV(e.target.value)}
                    >
                      <FormControlLabel
                        value="Visa"
                        control={<Radio sx={{ color: "#632D18" }} />}
                        label="Visa"
                        sx={{ color: "#632D18" }}
                      />
                      <FormControlLabel
                        value="Mastercard"
                        control={<Radio sx={{ color: "#632D18" }} />}
                        label="Mastercard"
                        sx={{ color: "#632D18" }}
                      />
                      <FormControlLabel
                        value="CMI"
                        control={<Radio sx={{ color: "#632D18" }} />}
                        label="CMI"
                        sx={{ color: "#632D18" }}
                      />
                    </RadioGroup>
                  </FormControl>
                  {CVV && (
                    <>
                      <CustomInput
                        type="number"
                        id="CVV"
                        placeholder="CVV"
                        value={CVV}
                        onChange={(e) => setCVV(e.target.value)}
                        variant="outlined"
                        sx={{
                          bgcolor: "#E2CFAB",
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "space-around",
                          width: "220px",
                          left: "193px",
                          borderRadius: "5px",
                        }}
                      />
                      <CustomInput
                        type="date"
                        id="ExpirationDate"
                        placeholder="Expiration Date"
                        value={ExpirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        variant="outlined"
                        sx={{
                          bgcolor: "#E2CFAB",
                          marginTop: "10px",
                          borderRadius: "5px",
                          width: "220px",
                        }}
                      />
                    </>
                  )}
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "#E2CFAB",
                    color: "#632D18",
                    border: "1px solid #E2CFAB",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    width: "100px",
                    height: "40px",
                    marginTop: "20px",
                    fontFamily: "Georgia ,serif",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  Enter
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
