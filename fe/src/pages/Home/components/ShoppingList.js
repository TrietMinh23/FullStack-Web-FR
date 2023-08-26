import { useEffect, useState } from "react";
import ShoppingCard from "./ShoppingCard";
import { products } from "../../../api/products";
import React from "react";
import CardSkeleton from "../../../components/ui/CardSkeleton";
import { getByCategory } from "../../../api/category";

export default function ShoppingList({ page, category, handleSetTotalPage }) {
  const [productsList, setProducts] = useState(null);

  useEffect(() => {
    async function getProduct() {
      setProducts(null);
      window.scrollTo(0, 0);
      try {
        let res;
        if (category && category.length > 0) {
          // Call the appropriate API based on the category
          res = await getByCategory(category, page);
        } else {
          res = await products(page);
        }
        setProducts(res.data.products);
        sessionStorage.setItem("totalPage", res.data.totalPages);
        handleSetTotalPage(res.data.totalPages);
      } catch (err) {
        console.log(err);
      }
    }

    getProduct();
  }, [page, category]);

  return (
    <section
      id="Projects"
      className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-14 gap-x-6 mt-10 mb-5"
    >
      {productsList ? (
        productsList.map((item) => (
          <ShoppingCard
            id={item._id}
            key={item._id}
            title={item.title}
            image={item.image}
            price={item.price}
          />
        ))
      ) : (
        <CardSkeleton cards={20} />
      )}
    </section>
  );
}
