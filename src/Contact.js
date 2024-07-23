import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Contact() {
  const [sendHovered, setSendHovered] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem("isloged"));
    if (!isLogged) {
      navigate("/"); 
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  if (!isLoggedIn) {
    return null; // Render nothing if the user is not logged in (optional)
  }

  return (
    <>
      <Nav />
      <Box sx={{ flexGrow: 1, height: "498px" }}>
        <Grid container spacing={1} columns={16} sx={{ height: "490px" }}>
          <Grid item xs={8} sx={{ height: "100%" }}>
            <Item
              sx={{
                backgroundColor: "#E2CFAB",
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
                  color: "#A47646",
                  //? fontFamily: "Gill Sans Ultra Bold",
                  fontWeight: "bold",
                  fontSize: "50px",
                  fontFamily: "Georgia ,serif",
                  textTransform: "capitalize",
                  marginTop: "30px",
                }}
              >
                Get In Touch With us
              </h1>
              <p
                style={{
                  fontWeight: "normal",
                  marginTop: "-5px",
                  fontSize: "25px",
                  color: "#A47646",
                  // ?fontFamily: "Gill Sans Ultra Bold",
                  textTransform: "lowercase",
                  fontFamily: "Georgia ,serif",
                  textTransform: "capitalize",
                  letterSpacing: "1.5px",
                  lineHeight: "1.8",
                  textAlignLast: "center",
                }}
              >
                Do you have a question about our <br />
                products or services? We're here to <br />
                help! Don't hesitate to contact us <br />
                via the form below or reach out to us <br />
                using the provided options. Our team <br />
                will be happy to answer your questions
                <br />
                and provide technical support
              </p>
            </Item>
          </Grid>
          <Grid item xs={8} sx={{ height: "497px" }}>
            <Item
              sx={{
                backgroundColor: "#E2CFAB",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1
                style={{
                  color: "#A47646",
                  fontWeight: "bold",
                  fontSize: "50px",
                  textTransform: "lowercase",
                  fontFamily: "Georgia ,serif",
                  textTransform: "capitalize",
                  marginTop: "30px",
                }}
              >
                Contact us
              </h1>
              <Box sx={{ width: "80%", mt: -3 }}>
                <TextField
                  id="outlined-basic"
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    style: {
                      color: "#A47646",
                    },
                  }}
                  InputProps={{
                    style: {
                      borderColor: "#632D18",
                      color: "#632D18",
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: "80%", mt: 2 }}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    style: {
                      color: "#A47646",
                    },
                  }}
                  InputProps={{
                    style: {
                      borderColor: "#632D18",
                      color: "#632D18",
                    },
                  }}
                />
              </Box>

              <Box sx={{ width: "80%", mt: 2 }}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    style: {
                      color: "#A47646",
                    },
                  }}
                  InputProps={{
                    style: {
                      borderColor: "#632D18",
                      color: "#632D18",
                      minHeight: "150px",
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: "80%", mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#632D18",
                    color: "#fff",
                    padding: "10px",
                    width: "150px",
                    fontWeight: "bold",
                    fontSize: "20px",
                    fontFamily: "Georgia, serif",
                    textTransform: "capitalize",
                    transition: "background-color 0.3s, color 0.3s",
                    "&:hover": {
                      backgroundColor: "#7f3f23",
                    },
                  }}
                  onMouseEnter={() => setSendHovered(true)}
                  onMouseLeave={() => setSendHovered(false)}
                >
                  {sendHovered ? "Sending..." : "Send"}
                </Button>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
