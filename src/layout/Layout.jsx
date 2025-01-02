import React from "react";
import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router";
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
