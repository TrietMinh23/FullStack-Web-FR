import React, { useEffect } from "react";
import Navbar from "./components/NavBar";
import { Outlet } from "react-router";

export default function LayoutHomePage() {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
}
