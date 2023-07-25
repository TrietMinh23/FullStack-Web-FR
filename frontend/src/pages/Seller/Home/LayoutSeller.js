import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/NavBar";
import LeftNav from "../components/LeftNav";
import { ThemeProvider } from "@material-tailwind/react";

export default function LayoutSeller() {
  const [sideBar, setSideBar] = useState(false);
  return (
    <React.Fragment>
      <Navbar setSideBarFunc={() => setSideBar(!sideBar)} />
      <LeftNav sideBarProp={sideBar} />
      <ThemeProvider>
        <div className="bg-white xl:ml-64 ml-0 mt-[-100vh] relative min-h-screen">
          <div className="p-4">
            <Outlet />
          </div>
          <div
            className={`cover ${
              sideBar ? "block" : "hidden"
            } absolute top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50`}
          ></div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}
