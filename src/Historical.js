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
import axios from "axios";
import { useParams } from "react-router-dom";

function createData(Id, Product, Price, Quantity) {
  const Total = Price * Quantity;
  return { Id, Product, Price, Quantity, Total };
}

export default function Panier() {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const [UserData , setUserData] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"))
    setUserData(userdata)
    const loadHistoricalOrders = async () => {
      const historicalOrders = await fetchHistoricalOrders(userdata.ID_Customer);
      if (Array.isArray(historicalOrders)) {
        const newRows = historicalOrders.map((item) =>
          createData(
            item.Order_ID,
            item.Product_Name,
            parseFloat(item.Price || 0),
            parseInt(item.Quantity || 0, 10)
          )
        );
        setRows(newRows);
      } else {
        console.error("Expected an array but got:", historicalOrders);
        setRows([]);
      }
    };

    loadHistoricalOrders();
  }, []);
  
  const fetchHistoricalOrders = async (customerId) => {
    axios.get(`http://localhost/Sql%20pfe/Historical.php?ID_Customer=${customerId}`)
    .then(response => {
        console.log('Orders:', response.data);
        setRows(response.data)
    })
    .catch(error => {
        console.error('There was an error fetching the orders!', error);
    });
  };



  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
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
              marginTop: "25px",
              textAlign: "center",
              color: "#632D18",
              fontSize: "37px",
              fontFamily: "Georgia ,serif",
              fontWeight: "bold",
            }}
          >
            Historical orders
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
                      fontFamily: "Georgia ,serif",
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
                      fontFamily: "Georgia ,serif",
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
                      fontFamily: "Georgia ,serif",
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
                      fontFamily: "Georgia ,serif",
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
                      fontFamily: "Georgia ,serif",
                    }}
                  >
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows.map((row) => (
                  <TableRow key={row.Product_ID}>
                    <TableCell
                      align="right"
                      sx={{ color: "#632D18", fontSize: "15px" }}
                    >
                      {row.Product_ID}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "#632D18", fontSize: "15px" }}
                    >
                      {row.Name}
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
      </Grid>
    </div>
  );
}
