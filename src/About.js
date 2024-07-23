// src/About.js
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import "./App.css";
import Nav from "./Nav";
import footerImage from "./img/page.png";
import { useNavigate } from "react-router-dom";

function About() {
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

  if (!isLoggedIn) {
    return null; 
  }

  return (
    <>
      <Nav />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <Grid container sx={{ flex: 1 }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#E2CFAB",
            }}
          >
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "580px",
                marginTop: -3,
              }}
              alt="About Us Image"
              src={footerImage}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#C8905E",
              padding: 4,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "#632D18",
                marginTop: -2,
                fontWeight: "bold",
                fontSize: "60px",
                textTransform: "lowercase",
                fontFamily: "Georgia ,serif",
                textTransform: "capitalize",
              }}
            >
              About Us
            </Typography>
            <Typography variant="body1" sx={{ color: "#632D18", marginTop: 2 }}>
              Welcome to F.z.a, your premier online destination for the finest
              coffee from around the world. <br />
              At F.z.a, we are passionate about delivering an exceptional coffee
              experience to every cup. <br />
              Our carefully curated selection includes a wide variety of
              single-origin beans, artisanal blends, <br />
              and specialty roasts, all sourced from the best coffee-growing
              regions. We believe in quality, sustainability, and the art of
              coffee. That’s why we work directly with farmers and roasters who
              share our commitment to excellence. Whether you're a coffee
              connoisseur or just starting your journey, F.z.a offers something
              for everyone—from bold, rich flavors to delicate, nuanced notes.
              Explore our easy-to-navigate website, enjoy secure and hassle-free
              shopping, and benefit from our fast and reliable shipping. Join
              the F.z.a community today and elevate your coffee experience with
              our exclusive offers, expert tips, and more.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default About;
