import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import logo from "./img/logo fza.png";

function Nav(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

Nav.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isloged = JSON.parse(localStorage.getItem("isloged"));
    setIsLogged(isloged);
  }, []);

  const handlePersonIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogInClick = () => {
    handleMenuClose();
    navigate("/in6");
  };

  const handleSignUpClick = () => {
    handleMenuClose();
    navigate("/in5");
  };

  const handleSignOutClick = () => {
    localStorage.removeItem("isloged");
    setIsLogged(false);
    handleMenuClose();
    navigate("/");
  };

  const handleContactClick = () => {
    navigate("/in4");
  };

  const handleProductClick = () => {
    navigate("/in2");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleAboutClick = () => {
    navigate("/in7");
  };

  const handleCartClick = () => {
    navigate("/in12");
  };

  const handleLogoClick = () => {
    navigate("/in3");
  };

  return (
    <>
      <CssBaseline />
      <Nav {...props}>
        <AppBar sx={{ backgroundColor: "#E2CFAB" }}>
          <Toolbar>
            <Button onClick={handleLogoClick} sx={{ padding: 0 }}>
              <img
                src={logo}
                alt="error"
                style={{ height: 50, width: 50, marginTop: -2 }}
              />
            </Button>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              <Button
                onClick={handleHomeClick}
                sx={{
                  backgroundColor: "#E2CFAB",
                  color: "#632D18",
                  fontFamily: "Gill Sans Ultra Bold",
                  fontWeight: "bold",
                  fontSize: "25px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#632D18",
                    color: "#E2CFAB",
                  },
                }}
              >
                Home
              </Button>
              <Button
                onClick={handleAboutClick}
                sx={{
                  backgroundColor: "#E2CFAB",
                  color: "#632D18",
                  fontFamily: "Gill Sans Ultra Bold",
                  fontWeight: "bold",
                  fontSize: "25px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#632D18",
                    color: "#E2CFAB",
                  },
                }}
              >
                About
              </Button>
              <Button
                onClick={handleProductClick}
                sx={{
                  backgroundColor: "#E2CFAB",
                  color: "#632D18",
                  fontFamily: "Gill Sans Ultra Bold",
                  fontWeight: "bold",
                  fontSize: "25px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#632D18",
                    color: "#E2CFAB",
                  },
                }}
              >
                Product
              </Button>
              <Button
                onClick={handleContactClick}
                sx={{
                  backgroundColor: "#E2CFAB",
                  color: "#632D18",
                  fontFamily: "Gill Sans Ultra Bold",
                  fontWeight: "bold",
                  fontSize: "25px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#632D18",
                    color: "#E2CFAB",
                  },
                }}
              >
                Contact
              </Button>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Button onClick={handlePersonIconClick}>
                <PersonIcon sx={{ color: "#632D18" }} />
              </Button>
              <Button onClick={handleCartClick}>
                <ShoppingCartIcon sx={{ color: "#632D18" }} />
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Nav>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#A47646",
            color: "white",
            fontSize: "1.2rem",
          },
        }}
      >
        {isLogged ? (
          <>
            <MenuItem
              onClick={handleSignOutClick}
              sx={{
                transition: "all 0.3s ease",
                backgroundColor: "#A47646",
                color: "white",
                fontFamily: "Gill Sans Ultra Bold",
                fontWeight: "bold",
                fontSize: "1.2rem",
                "&:hover": {
                  backgroundColor: "#632D18",
                  color: "#E2CFAB",
                },
              }}
            >
              Sign Out
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={handleLogInClick}
              sx={{
                transition: "all 0.3s ease",
                backgroundColor: "#A47646",
                color: "white",
                fontFamily: "Gill Sans Ultra Bold",
                fontWeight: "bold",
                fontSize: "1.2rem",
                "&:hover": {
                  backgroundColor: "#632D18",
                  color: "#E2CFAB",
                },
              }}
            >
              Log In
            </MenuItem>
            <MenuItem
              onClick={handleSignUpClick}
              sx={{
                transition: "all 0.3s ease",
                backgroundColor: "#A47646",
                color: "white",
                fontFamily: "Gill Sans Ultra Bold",
                fontWeight: "bold",
                fontSize: "1.2rem",
                "&:hover": {
                  backgroundColor: "#632D18",
                  color: "#E2CFAB",
                },
              }}
            >
              Sign Up
            </MenuItem>
          </>
        )}
      </Menu>
      <Toolbar />
    </>
  );
}
