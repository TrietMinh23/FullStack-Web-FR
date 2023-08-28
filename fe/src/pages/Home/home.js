import * as React from "react";
import ShoppingList from "./components/ShoppingList";
import PaginationComponent from "./components/Pagination";
import Category from "./components/Category";
import { useSelector } from "react-redux";

export default function Home() {
  const [page, setPage] = React.useState(sessionStorage.getItem("page") || 1);
  const [category, setCategory] = React.useState(null);
  const totalPageU = useSelector((state) => state.product.totalPage);
  const [totalPage, setTotalPage] = React.useState(
    sessionStorage.getItem("totalPage") || totalPageU
  );

  const handleChange = (value) => {
    setPage(value);
  };

  const handleSetCategory = (value) => {
    setCategory(value);
  };

  const handleSetTotalPage = (value) => {
    setTotalPage(value);
  };

  React.useEffect(() => {
    if (!sessionStorage.getItem("page")) sessionStorage.setItem("page", page);
    else sessionStorage.setItem("page", page);

    setTotalPage(sessionStorage.getItem("totalPage") || totalPageU);
  }, [page, totalPageU]);

  return (
    <div className="py-12 bg-[#F5F5F5] sm:py-16 lg:py-20 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <Category setCategory={handleSetCategory} />
      <ShoppingList
        page={page}
        category={category}
        handleSetTotalPage={handleSetTotalPage}
      ></ShoppingList>
      <PaginationComponent
        setPage={handleChange}
        page={page}
        totalPage={totalPage}
      />
    </div>
  );
}
