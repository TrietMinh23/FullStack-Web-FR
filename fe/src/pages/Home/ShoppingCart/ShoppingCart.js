import { useSelector } from "react-redux";
import ItemShoppingCart from "./components/ItemShoppingCart";
import TableResponsiveShoppingCart from "./components/TableResponsiveShoppingCart";
import { Link } from "react-router-dom";
import React from "react";

export default function ShoppingCart() {
  const products = useSelector((state) => state.product.shoppingCart);

  const summarizeQuantity = (list) => {
    let sum = 0;
    for (let i of list) {
      for (let j of i.item) {
        sum += j.quantity;
      }
    }

    return sum;
  };

  const summarizePrice = (list) => {
    let sum = 0;
    for (let i of list) {
      for (let j of i.item) {
        sum += j.quantity * j.price;
      }
    }

    return sum;
  };

  return (
    <React.Fragment>
      {products.length ? (
        <div className="max-w-4xl mx-auto">
          <div className="overflow-auto mt-3 hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Details
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">
                    Price
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">
                    Quantities
                  </th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-center">
                    Total
                  </th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item) => (
                  <ItemShoppingCart shop={item} key={item.name} />
                ))}
              </tbody>
            </table>
          </div>
          <TableResponsiveShoppingCart products={products} />
          <div className="bg-white mt-6">
            <div className="px-2 py-4 flex justify-end items-center">
              <div>
                Total ({summarizeQuantity(products)} items){" "}
                {summarizePrice(products)}{" "}
              </div>
              <div className="ml-6">
                <Link
                  to="/purchase"
                  className="uppercase py-2 px-6 bg-gray-800 text-white hover:bg-gray-700"
                >
                  check out
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="nothing absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="nothing-wrapper text-center">
            <img
              src={process.env.PUBLIC_URL + "/cat-in-box.png"}
              className="mx-auto"
            />
            <h1 className="text-[1.8rem] my-2">You don't have any items yet</h1>
            <p className="mb-6">Start shopping by clicking on 'SHOPPING'</p>
            <Link
              to="/"
              className="uppercase py-2 px-6 bg-blue-500 rounded-sm text-white hover:border-blue-600 hover:bg-white transition-all hover:text-blue-600 border-2 border-transparent"
            >
              shopping
            </Link>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
