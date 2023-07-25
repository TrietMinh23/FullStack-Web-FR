import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = ({ setSideBarFunc }) => {
  return (
    <nav className="bg-gray-800 z-40">
      <div className="max-w-7xl mx-auto px-4 lg:pt-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            onClick={setSideBarFunc}
            className={`inline-flex items-center text-sm text-gray-500 rounded-lg xl:hidden focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
