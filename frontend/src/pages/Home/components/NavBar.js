import React from "react";
import ButtonNotification from "./ButtonNotification";
import ButtonShoppingCart from "./ButtonShoppingCart";
import ButtonUser from "./ButtonUser";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const Navbar = () => {
  const [isDropdownOpenMenu, setIsDropdownOpenMenu] = useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 lg:pt-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-center flex-shrink-0">
            <img
              className="h-16 w-16"
              src={process.env.PUBLIC_URL + "/logo-banner.png"}
              alt="Logo"
            />
            <h1 className="text-xl font-bold text-white hidden lg:block uppercase">
              fashion revive
            </h1>
          </div>
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 bg-gray-700 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-white focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsDropdownOpenMenu(!isDropdownOpenMenu)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon />
            </button>
          </div>
          <div className="hidden lg:block">
            <div className="flex space-x-4">
              <ButtonNotification />
              <ButtonUser />
              <ButtonShoppingCart />
            </div>
          </div>
        </div>
      </div>
      <div
        className={isDropdownOpenMenu ? "hidden" : "lg:hidden"}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#"
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Shipping Status
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Notification Status
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            User Account
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Shopping Cart
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
