import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "./img/background.png";
import "./App.css";
import Nav from "./Nav";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "#E2CFAB" ? "#E2CFAB" : "#E2CFAB",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Header() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/in7");
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
                backgroundImage: `radial-gradient(circle at 11% 37%, rgba(226,207,171, 0.44) 0%, 
                rgba(226,207,171, 0.44) 50%,transparent 50%, transparent 56%,transparent 56%, transparent 100%),
                radial-gradient(circle at 82% 7%, rgba(226,207,171, 0.44) 0%, rgba(226,207,171, 0.44) 46%,transparent 46%, transparent 88%,transparent 88%, transparent 100%),
                radial-gradient(circle at 81% 79%, rgba(226,207,171, 0.44) 0%, rgba(226,207,171, 0.44) 33%,transparent 33%, transparent 89%,transparent 89%, transparent 100%),
                radial-gradient(circle at 68% 96%, rgba(226,207,171, 0.44) 0%, rgba(226,207,171, 0.44) 8%,transparent 8%, transparent 26%,transparent 26%, transparent 100%),
                radial-gradient(circle at 69% 20%, rgba(226,207,171, 0.44) 0%, rgba(226,207,171, 0.44) 84%,transparent 84%, transparent 86%,transparent 86%, transparent 100%),
                radial-gradient(circle at 49% 22%, rgba(226,207,171, 0.44) 0%, rgba(226,207,171, 0.44) 71%,transparent 71%, transparent 78%,transparent 78%, transparent 100%),
                radial-gradient(circle at 23% 60%, rgba(226,207,171, 0.44) 0%, rgba(226,207,171, 0.44) 6%,transparent 6%, transparent 40%,transparent 40%, transparent 100%),
                radial-gradient(circle at 86% 33%, rgba(226,207,171, 0.44) 0%, rgba(226,207,171, 0.44) 13%,transparent 13%, transparent 98%,transparent 98%, transparent 100%),
                radial-gradient(circle at 38% 60%, rgba(226,207,171, 0.44) 0%, rgba(226,207,171, 0.44) 15%,transparent 15%, transparent 61%,transparent 61%, transparent 100%),
                linear-gradient(0deg, rgb(200,144,94),rgb(200,144,94))`,
              }}
            >
              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: "40px",
                  fontFamily: "Georgia ,serif",
                }}
              >
                Dolce Gusto
              </h1>
              <p
                style={{
                  fontSize: "15px",
                  marginTop: "-15px",
                  fontFamily: "Georgia ,serif",
                  textTransform: "capitalize",
                  letterSpacing: "1.5px",
                  lineHeight: "1.6",
                }}
              >
                Dolce Gusto is a brand of coffee <br />
                machines and coffee capsules <br />
                produced by Nestle. The Dolce Gusto <br />
                system is designed to provide a <br />
                convenient and efficient way to <br />
                enjoy a variety of coffee beverages <br />
                at home. The coffee machines are <br />
                known for their stylish design and <br />
                user-friendly interface, allowing <br />
                users to prepare espresso, <br />
                cappuccino, latte, and other <br />
                specialty drinks with ease.
              </p>
              <Button
                style={{
                  backgroundColor: "#c09c7c",
                  color: "#632D18",
                  padding: "20px",
                  width: "180px",
                  height: "50px",
                  border: "none",
                  borderRadius: "10px",
                  marginTop: "10px",
                  fontWeight: "bold",
                  fontSize: "20px",
                  fontFamily: "Georgia, serif",
                  textTransform: "capitalize",
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#b08a6a";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#c09c7c";
                  e.target.style.transform = "scale(1)";
                }}
                onClick={handleButtonClick}
              >
                Show Me
              </Button>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item
              sx={{
                marginTop: "0px",
                backgroundImage: `linear-gradient(135deg, rgba(107, 107, 107,0.06) 0%, rgba(107, 107, 107,0.06) 50%, rgba(202, 202, 202,0.06) 50%, rgba(202, 202, 202,0.06) 100%), 
                      linear-gradient(90deg, rgb(99,45,24), rgb(99,45,24))`,
                backgroundSize: "30px 30px",
                height: "490px",
                width: "auto",
              }}
            >
              <img
                src={logo}
                alt="error"
                style={{
                  height: 300,
                  width: 300,
                  marginTop: "100px",
                  borderRadius: "20px",
                }}
              />{" "}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
