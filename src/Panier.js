import * as React from "react";
import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Nav from "./Nav";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

function createData(Id, Product, Price, Quantity) {
  const Total = Price * Quantity;
  return { Id, Product, Price, Quantity, Total };
}

export default function Panier() {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [UserData, setUserData] = useState("");
  const rowsPerPage = 4;
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoged, setisLoged] = useState("")

  const fetchCartData = async (Product_ID) => {
    try {
      const response = await axios.get(
        `http://localhost/Sql%20pfe/product.php?id=${Product_ID}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching cart data:", error);
      return [];
    }
  };

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"))
    const isloged = JSON.parse(localStorage.getItem("isloged"))
    setisLoged(isloged)
    console.log(userdata)
    setUserData(userdata)
    const loadCart = async () => {
      const cartItems = await fetchCartData(id);
      if (Array.isArray(cartItems)) {
        const filteredRows = cartItems.filter((row) => row.Product_ID == id);
        const newRows = filteredRows.map((item) =>
          createData(
            item.Product_ID,
            item.Name,
            parseFloat(item.Price || 0),
            parseInt(item.Quantity || 0, 10)
          )
        );
        setRows(newRows);
      } else {
        console.error("Expected an array but got:", cartItems);
        setRows([]);
      }
    };

    loadCart();
  }, [id]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleCheckout = async () => {
    try {
      if (!isLoged) {
        navigate("/in6");
        return;
      }

      const totalAmount = rows.reduce((total, row) => total + row.Total, 0);
      const orderData = {
        ID_Customer: UserData.ID_Customer,
        OrderDate: new Date().toISOString().slice(0, 19).replace("T", " "),
        Total: totalAmount,
        Status: "Pending",
        Quantity: rows[0].Quantity,
      };
      const response = await axios.post(
        "http://localhost/Sql%20pfe/order.php",
        orderData
      );

      if (response.data.status === 1) {
        console.log("Order placed successfully");
        navigate("/in9");
      } else {
        console.error("Failed to place order:", response.data.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handleIncrementQuantity = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.Id === id) {
          const updatedQuantity = row.Quantity + 1;
          const updatedTotal = row.Price * updatedQuantity;
          return { ...row, Quantity: updatedQuantity, Total: updatedTotal };
        }
        return row;
      })
    );
  };

  const handleDecrementQuantity = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.Id === id && row.Quantity > 0) {
          const updatedQuantity = row.Quantity - 1;
          const updatedTotal = row.Price * updatedQuantity;
          return { ...row, Quantity: updatedQuantity, Total: updatedTotal };
        }
        return row;
      })
    );
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div style={{ backgroundColor: "#e2cfab", minHeight: "100vh" }}>
      <Nav />
      <Grid
        container
        spacing={2}
        sx={{
          borderRadius: "10px",
          width: "750px",
          height: "480px",
          position: "relative",
          top: "20px",
          left: "260px",
          backgroundColor: "#C8905E",
          border: "solid #632D18",
        }}
      >
        <Grid item xs={12}>
          <h1
            style={{
              marginTop: "5px",
              textAlign: "center",
              color: "#632D18",
              fontSize: "37px",
              fontFamily: "Georgia ,serif",
              fontWeight: "bold",
            }}
          >
            Shopping Cart
          </h1>
        </Grid>
        <Grid item xs={12} sm={10} md={10} lg={8} xl={4}>
          <TableContainer component={Paper} sx={{ width: "710px" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#632D18",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Georgia ,serif"
                    }}
                  >
                    Id
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#632D18",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Georgia ,serif"
                    }}
                  >
                    Product
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#632D18",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Georgia ,serif"
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#632D18",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Georgia ,serif"
                    }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#632D18",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Georgia ,serif"
                    }}
                  >
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows.map((row) => (
                  <TableRow key={row.Id}>
                    <TableCell
                      align="right"
                      sx={{ color: "#632D18", fontSize: "15px" }}
                    >
                      {row.Id}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#632D18", fontSize: "15px" }}
                    >
                      {row.Product}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#632D18", fontSize: "15px" }}
                    >
                      {row.Price}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#632D18", fontSize: "15px" }}
                    >
                      <Button onClick={() => handleDecrementQuantity(row.Id)}>
                        -
                      </Button>
                      {row.Quantity}
                      <Button onClick={() => handleIncrementQuantity(row.Id)}>
                        +
                      </Button>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#632D18", fontSize: "15px" }}
                    >
                      {row.Total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <button
            type="button"
            style={{
              backgroundColor: "transparent",
              position: "relative",
              width: "200px",
              height: "30px",
              right: "230px",
              top: "-10px",
              borderRadius: "5px",
              border: "none",
              color: "#632D18",
              cursor: "pointer",
            }}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            {"< Previous"}
          </button>
          <button
            type="button"
            style={{
              backgroundColor: "transparent",
              position: "relative",
              width: "200px",
              height: "30px",
              right: "-200px",
              top: "-10px",
              borderRadius: "5px",
              border: "none",
              color: "#632D18",
              cursor: "pointer",
            }}
            onClick={handleNextPage}
            disabled={currentPage * rowsPerPage >= rows.length}
          >
            {"Following >"}
          </button>
        </Grid>
        <Grid item xs={12}>
          <Button
            style={{
              backgroundColor: "#E2CFAB",
              position: "relative",
              width: "150px",
              height: "50px",
              right: "-270px",
              top: "5px",
              borderRadius: "5px",
              border: "none",
              color: "#632D18",
              cursor: "pointer",
              textTransform: "capitalize",
              fontFamily: "Georgia ,serif",
              fontSize:"20px",
              fontWeight: "bold"
            }}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
