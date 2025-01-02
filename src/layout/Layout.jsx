import React, { useContext } from "react";
import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Footer from "../components/shared/Footer";

const Layout = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
