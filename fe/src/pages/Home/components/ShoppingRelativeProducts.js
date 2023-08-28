import { useEffect, useState } from "react";
import CardSkeleton from "../../../components/ui/CardSkeleton";
import { getRelativeProduct } from "../../../api/products";
import ShoppingCardRelative from "./ShoppingCardRelative";

export default function ShoppingRelativeProducts({ category, id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getRelativeProduct(category, id)
      .then((res) => {
        setData(res.data.products);
      })
      .catch((err) => console.log(err));
  }, [category]);

  return (
    <div className="relative-box">
      <h1 className="ml-24 text-3xl uppercase">Relative products</h1>
      <section className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-14 gap-x-14 mt-10 mb-5">
        {data ? (
          data.map((item) => (
            <ShoppingCardRelative
              id={item._id}
              key={item._id}
              title={item.title}
              image={item.image}
              price={item.price}
              brand={item.brandName}
            />
          ))
        ) : (
          <CardSkeleton cards={4} />
        )}
      </section>
    </div>
  );
}
