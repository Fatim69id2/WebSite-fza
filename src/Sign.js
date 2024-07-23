import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import logo from "./img/background.png";
import img from "./img/logo fza.png";
import TextField from "@mui/material/TextField";
import "./App.css";
import Nav from "./Nav";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "#E2CFAB" ? "#E2CFAB" : "#E2CFAB",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Header() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem("isloged"));
    if (isLogged) {
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/Sql%20pfe/index.php",
        formData
      );
      console.log(response.data);
      if (response.data.status === 1) {
        localStorage.setItem("isloged", true);
        navigate("/in6");
      } else {
        alert("Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  return (
    <>
      <Nav />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} columns={16}>
          <Grid item xs={8}>
            <Item
              style={{
                marginTop: "0px",
                color: "#632D18",
                fontFamily: "Gill Sans Ultra Bold",
                height: "490px",
                backgroundColor: "#A47646",
                borderRadius: "30px 30px 30px 30px",
                backgroundImage: `
                linear-gradient(116deg, rgba(232, 232, 232, 0.03) 0%, rgba(232, 232, 232, 0.03) 10%,rgba(14, 14, 14, 0.03) 10%, rgba(14, 14, 14, 0.03) 66%,rgba(232, 232, 232, 0.03) 66%, rgba(232, 232, 232, 0.03) 72%,rgba(44, 44, 44, 0.03) 72%, rgba(44, 44, 44, 0.03) 81%,rgba(51, 51, 51, 0.03) 81%, rgba(51, 51, 51, 0.03) 100%),
                linear-gradient(109deg, rgba(155, 155, 155, 0.03) 0%, rgba(155, 155, 155, 0.03) 23%,rgba(30, 30, 30, 0.03) 23%, rgba(30, 30, 30, 0.03) 63%,rgba(124, 124, 124, 0.03) 63%, rgba(124, 124, 124, 0.03) 73%,rgba(195, 195, 195, 0.03) 73%, rgba(195, 195, 195, 0.03) 84%,rgba(187, 187, 187, 0.03) 84%, rgba(187, 187, 187, 0.03) 100%),
                linear-gradient(79deg, rgba(254, 254, 254, 0.03) 0%, rgba(254, 254, 254, 0.03) 27%,rgba(180, 180, 180, 0.03) 27%, rgba(180, 180, 180, 0.03) 33%,rgba(167, 167, 167, 0.03) 33%, rgba(167, 167, 167, 0.03) 34%,rgba(68, 68, 68, 0.03) 34%, rgba(68, 68, 68, 0.03) 63%,rgba(171, 171, 171, 0.03) 63%, rgba(171, 171, 171, 0.03) 100%),
                linear-gradient(109deg, rgba(71, 71, 71, 0.03) 0%, rgba(71, 71, 71, 0.03) 3%,rgba(97, 97, 97, 0.03) 3%, rgba(97, 97, 97, 0.03) 40%,rgba(40, 40, 40, 0.03) 40%, rgba(40, 40, 40, 0.03) 55%,rgba(5, 5, 5, 0.03) 55%, rgba(5, 5, 5, 0.03) 73%,rgba(242, 242, 242, 0.03) 73%, rgba(242, 242, 242, 0.03) 100%),
                linear-gradient(271deg, rgba(70, 70, 70, 0.03) 0%, rgba(70, 70, 70, 0.03) 11%,rgba(178, 178, 178, 0.03) 11%, rgba(178, 178, 178, 0.03) 23%,rgba(28, 28, 28, 0.03) 23%, rgba(28, 28, 28, 0.03) 72%,rgba(152, 152, 152, 0.03) 72%, rgba(152, 152, 152, 0.03) 86%,rgba(43, 43, 43, 0.03) 86%, rgba(43, 43, 43, 0.03) 100%),
                linear-gradient(90deg, rgb(200,144,94),rgb(164,118,70))
                `,
                width: "100%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <img
                src={img}
                alt="img"
                style={{ height: "60px", width: "60px" }}
              />
              {!isLoggedIn && (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ width: "80%", mt: 1, ml: 7 }}>
                    <TextField
                      id="FirstName"
                      name="FirstName"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      value={formData.FirstName}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        style: {
                          color: "#FAEBD7",
                          fontWeight: "bold",
                          fontSize: "20px",
                          fontFamily: "Georgia ,serif",
                          textTransform: "capitalize",
                        },
                      }}
                      InputProps={{
                        style: {
                          borderColor: "#632D18",
                          color: "#632D18",
                          fontWeight: "bold",
                          fontSize: "20px",
                          fontFamily: "Georgia ,serif",
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ width: "80%", mt: 3, ml: 7 }}>
                    <TextField
                      id="LastName"
                      name="LastName"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      value={formData.LastName}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        style: {
                          color: "#FAEBD7",
                          fontWeight: "bold",
                          fontSize: "20px",
                          fontFamily: "Georgia ,serif",
                          textTransform: "capitalize",
                        },
                      }}
                      InputProps={{
                        style: {
                          borderColor: "#632D18",
                          color: "#632D18",
                          fontWeight: "bold",
                          fontSize: "20px",
                          fontFamily: "Georgia ,serif",
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ width: "80%", mt: 3, ml: 7 }}>
                    <TextField
                      id="Email"
                      name="Email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={formData.Email}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        style: {
                          color: "#FAEBD7",
                          fontWeight: "bold",
                          fontSize: "20px",
                          fontFamily: "Georgia ,serif",
                          textTransform: "capitalize",
                        },
                      }}
                      InputProps={{
                        style: {
                          borderColor: "#632D18",
                          color: "#632D18",
                          fontWeight: "bold",
                          fontSize: "20px",
                          fontFamily: "Georgia ,serif",
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ width: "80%", mt: 3, ml: 7 }}>
                    <TextField
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      value={formData.password}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        style: {
                          color: "#FAEBD7",
                          fontWeight: "bold",
                          fontSize: "20px",
                          fontFamily: "Georgia ,serif",
                          textTransform: "capitalize",
                        },
                      }}
                      InputProps={{
                        style: {
                          borderColor: "#632D18",
                          color: "#632D18",
                          fontWeight: "bold",
                          fontSize: "20px",
                          fontFamily: "Georgia ,serif",
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </Box>
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#c09c7c",
                      color: "#632D18",
                      padding: "10px",
                      width: "150px",
                      marginTop: "20px",
                      height: "50px",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      fontSize: "20px",
                      fontFamily: "Georgia, serif",
                      textTransform: "capitalize",
                      transition:
                        "background-color 0.3s ease, color 0.3s ease, transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#b08a6a";
                      e.target.style.color = "#502311";
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#c09c7c";
                      e.target.style.color = "#632D18";
                      e.target.style.transform = "scale(1)";
                    }}
                  >
                    Sign Up
                  </Button>
                </form>
              )}
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item
              style={{ marginTop: "0px", borderRadius: "30px 30px 30px 30px" }}
            >
              <img
                src={logo}
                alt="error"
                style={{ height: 470, width: 500, marginTop: -2 }}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
