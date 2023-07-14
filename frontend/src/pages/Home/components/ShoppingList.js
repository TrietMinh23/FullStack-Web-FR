import { useEffect, useState } from "react";
import ShoppingCard from "./ShoppingCard";
import { fakeapi } from "../../../api/config";
import React from "react";

export default function ShoppingList() {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    fakeapi().then((res) => setProducts(res.data));
  }, []);
  return (
    <div>
      <div className="lg:w-3/4 lg:mx-auto bg-white">
        <main className="grid grid-cols-2 gap-x-6 gap-y-10 px-2 pb-20 sm:grid-cols-3 sm:px-8 pt-16 lg:px-9 lg:grid-cols-4 lg:gap-x-4 lg:px-0">
          {products?.map((item) => (
            <ShoppingCard
              id={item.id}
              key={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
