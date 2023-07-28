import React from "react";
import ShoppingList from "./components/ShoppingList";
import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <div className="py-12 bg-white sm:py-16 lg:py-20 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <ShoppingList></ShoppingList>
      <Pagination />
    </div>
  );
}
