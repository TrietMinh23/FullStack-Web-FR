import React from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteAllCookies from "../../../utils/deleteCookie";

const routerSeller = [
  {
    name: "Product Management",
    url: "/seller",
  },
  {
    name: "All item",
    url: "all-item",
  },
  {
    name: "Add new item",
    url: "add-new-item",
  },
  {
    name: "All orders",
    url: "all-orders",
  },
  {
    name: "Seller review",
    url: "review",
  },
  {
    name: "Profile",
    url: "profile"
  },
  {
    name: "Settings",
  },
];

export default function LeftNav({ sideBarProp, setSideBarFunc, setCoverFunc }) {
  const navigate = useNavigate();
  const logOut = () => {
    deleteAllCookies();
    navigate("/");
  };
  return (
    <div
      className={`sticky top-0 left-0 z-40 w-64 h-screen transition-transform ${
        sideBarProp ? "-translate-x-0" : "-translate-x-full"
      } xl:translate-x-0 rounded-none w-64 shadow-xl bg-gray-300 shadow-blue-gray-900/5`}
    >
      <ul className="min-w-0 h-full space-y-2 font-medium">
        {routerSeller.map((item, i) => (
          <Link
            onClick={() => {
              setSideBarFunc();
              setCoverFunc();
            }}
            to={item.url}
          >
            <li className="flex items-center p-2 text-gray-900 hover:bg-dark-jungle-green hover:text-white group">
              <span>{item.name}</span>
            </li>
          </Link>
        ))}
        <button
          onClick={() => {
            setSideBarFunc();
            setCoverFunc();
            logOut();
          }}
          className="block w-full"
        >
          <li className="flex items-center p-2 text-gray-900 hover:bg-dark-jungle-green hover:text-white group">
            <span>Log out</span>
          </li>
        </button>
      </ul>
    </div>
  );
}
