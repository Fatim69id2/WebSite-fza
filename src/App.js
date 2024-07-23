import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import "./App.css";
import Nav from "./Nav";
import Header from "./Header";
import Product from "./Product";
import Footer from "./Footer";
import Contact from "./Contact";
import Sign from "./Sign";
import About from "./About";
import Log from "./Log";
import Panier from "./Panier";
import Check from "./Check";
import Admin from "./Admin";
import Historical from "./Historical";
import Import from "./Import";
const theme = createTheme({
  palette: {
    primary: {
      main: "#D94E28",
    },
  },
});
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/in1" element={<Nav />} />
            <Route path="/in2" element={<Product />} />
            <Route path="/in3" element={<Footer />} />
            <Route path="/in4" element={<Contact />} />
            <Route path="/in5" element={<Sign />} />
            <Route path="/in6" element={<Log />} />
            <Route path="/in7" element={<About />} />
            <Route path="/in8/:id" element={<Panier />} />
            <Route path="/in9" element={<Check />} />
            <Route path="/in10" element={<Admin />} />
            <Route path="/in11" element={<Import />} />
            <Route path="/in12" element={<Historical />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}
export default App;
