import React from "react";
import Navbar from "./components/NavBar";
import Home from "./home";
import { Outlet } from "react-router";

export default function LayoutHomePage() {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
}
