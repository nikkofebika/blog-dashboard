import React from "react";
import Navbar from "../components/molecules/Navbar";
import Sidebar from "../components/molecules/Sidebar";
import Footer from "../components/molecules/Footer";
import Dashboard from "../pages/Dashboard";
import { BrowserRouter } from "react-router-dom";
const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Dashboard />
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
