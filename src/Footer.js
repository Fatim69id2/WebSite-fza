import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Nav from "./Nav";
import logo from "./img/logo fza.png";
import contactUsImage from "./img/footerr.png";
import anotherImage from "./img/footer1.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CopyrightIcon from "@mui/icons-material/Copyright";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ColumnsGrid() {
  const navigate = useNavigate();

  return (
    <>
      <Nav />
      <Box sx={{ flexGrow: 1, height: "auto" }}>
        <Grid container spacing={1} columns={16} sx={{ height: "100%" }}>
          <Grid item xs={8} sx={{ height: "100%"}}>
            <Item sx={{ backgroundColor: "#E2CFAB", height: "100%" }}>
              <img
                src={logo}
                alt="logo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Item>
          </Grid>
          <Grid item xs={8} sx={{ height: "100%" }}>
            <Item sx={{ backgroundColor: "#E2CFAB", height: "100%" }}>
              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: "35px",
                  color: "#632D18",
                  fontFamily: "Gill Sans Ultra Bold",
                }}
              >
                Contact us
              </h1>
              <Box sx={{ marginTop: "20px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <img
                    src={contactUsImage}
                    alt="Contact Us"
                    style={{ width: "180px", height: "185px" }}
                  />
                  <img
                    src={anotherImage}
                    alt="Another"
                    style={{ width: "180px", height: "185px" }}
                  />
                </div>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  marginTop: "15px",
                }}
              >
                <a
                  href="https://www.facebook.com/share/jDXsvBuJHWD2UKtt/?mibextid=qi2Omg"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      color: "#632D18",
                      border: "none",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      minWidth: "auto",
                      padding: 0,
                    }}
                  >
                    <FacebookIcon sx={{ fontSize: "90px" }} />
                  </Button>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=pkRGeVOa-Hk"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      color: "#632D18",
                      border: "none",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      minWidth: "auto",
                      padding: 0,
                    }}
                  >
                    <YouTubeIcon sx={{ fontSize: "90px" }} />
                  </Button>
                </a>

                <a
                  href="https://www.instagram.com/parfumerie_yassin_taza?igsh=MWdydHAyYTZlNmhubg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      color: "#632D18",
                      border: "none",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      minWidth: "auto",
                      padding: 0,
                    }}
                  >
                    <InstagramIcon sx={{ fontSize: "90px" }} />
                  </Button>
                </a>
                <a
                  href="https://wa.me/212707734869"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      color: "#632D18",
                      border: "none",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      minWidth: "auto",
                      padding: 0,
                    }}
                  >
                    <WhatsAppIcon sx={{ fontSize: "90px" }} />
                  </Button>
                </a>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  onClick={() => navigate("/in5")}
                  sx={{
                    marginTop: "50px",
                    color: "#632D18",
                    backgroundColor: "#C8905E",
                    border: "solid #C8905E",
                    fontWeight: "bold",
                    fontSize: "30px",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    minWidth: "auto",
                    padding: 0,
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  onClick={() => navigate("/in6")}
                  sx={{
                    marginTop: "50px",
                    color: "#632D18",
                    backgroundColor: "#C8905E",
                    border: "solid #C8905E",
                    fontWeight: "bold",
                    fontSize: "30px",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    minWidth: "auto",
                    padding: 0,
                  }}
                >
                  Log in
                </Button>
              </Box>
              <Box sx={{ marginTop: "60px" }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#632D18", fontWeight: "bold" , marginTop:"65px"}}
                >
                  F.z.a store copyright
                  <CopyrightIcon
                    sx={{ fontSize: "large", marginLeft: "5px" }}
                  />
                </Typography>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
