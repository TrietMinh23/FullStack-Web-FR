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
      const listFromLocalStorage = JSON.parse(localStorage.getItem("list"));
      // Check if listFromLocalStorage is not null before accessing length
      if (listFromLocalStorage && listFromLocalStorage.length) {
        dispatch(UPDATEPRODUCT({ listProduct: listFromLocalStorage }));
      }
    }
  }, []);
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
}
