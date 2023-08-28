import { useEffect, useState } from "react";
import ShoppingCard from "./ShoppingCard";
import { getByPrice, products } from "../../../api/products";
import React from "react";
import CardSkeleton from "../../../components/ui/CardSkeleton";
import { getByCategory } from "../../../api/category";
import { useSelector } from "react-redux";

export default function ShoppingList({
  page,
  category,
  handleSetTotalPage,
  price,
}) {
  const [productsList, setProducts] = useState(null);
  const listProduct = useSelector((state) => state.product.products);
  const isSearch = useSelector((state) => state.product.search);
  const [isGet, setIsGet] = useState(false);

  useEffect(() => {
    async function getProduct() {
      setProducts(null);
      window.scrollTo(0, 0);
      try {
        let res;
        setIsGet(false);
        if (category && category.length > 0) {
          // Call the appropriate API based on the category
          res = await getByCategory(category, 1);
        } else if (price) {
          console.log("hello");
          res = await getByPrice(price, 1);
        } else {
          res = await products(page);
        }
        console.log("CHECK: ", res.data.products);
        setProducts(res.data.products);
        sessionStorage.setItem("totalPage", res.data.totalPages);
        handleSetTotalPage(res.data.totalPages);
        setIsGet(true);
      } catch (err) {
        console.log(err);
      }
    }

    if (isSearch) {
      setProducts(listProduct);
    } else if (listProduct.length > 0) {
      setProducts(listProduct);
    } else getProduct();
  }, [page, category, listProduct, price]);

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
            brand={item.brandName}
          />
        ))
      ) : (
        <CardSkeleton cards={20} />
      )}
    </section>
  );
}
