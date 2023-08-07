import React, { useEffect } from "react";
import Navbar from "./components/NavBar";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { UPDATEPRODUCT } from "../../utils/redux/productsSlice";
import getCookie from "../../utils/getCookie";

export default function LayoutHomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (getCookie("refresh_token")) {
      dispatch(
        UPDATEPRODUCT({
          listProduct: JSON.parse(localStorage.getItem("list")),
        })
      );
    }
  }, []);
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
}
