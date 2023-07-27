import ViewListIcon from "@mui/icons-material/ViewList";
import { useState } from "react";
import React from "react";

export default function SideBar() {
  const [sideBar, setSideBar] = useState(false);
  return (
    <React.Fragment>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={() => setSideBar(true)}
        className={`inline-flex items-center p-2 mt-2 ml-3 text-sm ${
          sideBar ? "hidden" : "block"
        } text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
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
      <aside
        id="default-sidebar"
        className={`sticky top-0 left-0 z-40 w-64 h-screen transition-transform ${
          sideBar ? "-translate-x-0" : "-translate-x-full"
        } xl:translate-x-0`}
        aria-label="default-sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-cultured">
          <div className="flex justify-between">
            <h1>FR-SHOP</h1>
            <button
              type="button"
              className="w-8 h-8 inline-flex justify-center items-center gap-2 rounded-md border border-gray-200 text-gray-600 hover:text-gray-400 transition dark:border-gray-700"
              data-hs-overlay="#hs-overlay-basic"
              aria-controls="hs-overlay-basic"
              onClick={() => setSideBar(false)}
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Close Sidebar</span>
              <svg
                className="w-3 h-3"
                width={16}
                height={16}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </button>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:text-white dark:hover:bg-gray-700 group"
              >
                <ViewListIcon />
                <span className="ml-3">All order</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </React.Fragment>
  );
}
