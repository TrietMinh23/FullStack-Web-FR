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
    // <div>
    //   <div className="lg:w-3/4 lg:mx-auto bg-white">
    //     <main className="grid grid-cols-2 gap-x-6 gap-y-10 px-2 pb-20 sm:grid-cols-3 sm:px-8 pt-16 lg:px-9 lg:grid-cols-4 lg:gap-x-4 lg:px-0">
    //       {products?.map((item) => (
    //         <ShoppingCard
    //           id={item.id}
    //           key={item.id}
    //           title={item.title}
    //           image={item.image}
    //           price={item.price}
    //         />
    //       ))}
    //     </main>
    //   </div>
    // </div>
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Our featured items
          </h2>
          <p className="mt-4 text-base font-normal leading-7 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
            faucibus massa dignissim tempus.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
          {products?.map((item) => (
            <ShoppingCard
              id={item.id}
              key={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
