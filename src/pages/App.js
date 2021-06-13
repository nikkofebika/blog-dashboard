import React from "react";
import Navbar from "../components/molecules/Navbar";
import Sidebar from "../components/molecules/Sidebar";
import Footer from "../components/molecules/Footer";
import Content from "../pages/Content";
import { BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Content />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
