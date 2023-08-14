import React, { useEffect } from "react";
import Navbar from "./components/NavBar";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { UPDATEPRODUCT } from "../../utils/redux/productsSlice";
import getCookie from "../../utils/getCookie";

export default function LayoutHomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      getCookie("refresh_token") &&
      localStorage.getItem("role").replace(/^"(.*)"$/, "$1") === "buyer"
    ) {
      const listFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
      if (listFromLocalStorage.first) {
        dispatch(
          UPDATEPRODUCT({
            total: listFromLocalStorage.products.length,
            flag: true,
          })
        );
      }
      // Check if listFromLocalStorage is not null before accessing length
      else if (listFromLocalStorage && listFromLocalStorage.products.length) {
        console.log("CHECKKKKK");
        dispatch(UPDATEPRODUCT({ listProduct: listFromLocalStorage.products }));
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
