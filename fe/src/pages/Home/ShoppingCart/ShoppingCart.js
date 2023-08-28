import { useDispatch, useSelector } from "react-redux";
import ItemShoppingCart from "./components/ItemShoppingCart";
import TableResponsiveShoppingCart from "./components/TableResponsiveShoppingCart";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import {
  ADDTOPURCHASEALL,
  REMOVEFROMPURCHASEALL,
} from "../../../utils/redux/productsSlice";

export default function ShoppingCart() {
  const products = useSelector((state) => state.product.shoppingCart);
  const purchase = useSelector((state) => state.product.purchase);
  console.log("Purchase: ", purchase);

  const dispatch = useDispatch();

  const summarizeQuantity = (list) => {
    let sum = 0;
    for (let i of list) {
      sum += i.item.length;
    }

    return sum;
  };

  const summarizePrice = (list) => {
    let sum = 0;
    for (let i of list) {
      for (let j of i.item) {
        sum += j.price;
      }
    }

    return sum;
  };

  const selectAllProducts = (e) => {
    const listCheckedBox = document.getElementsByClassName("checkbox");
    for (let index = 0; index < listCheckedBox.length; index++) {
      const element = listCheckedBox[index];
      element.checked = e.target.checked ? true : false;
    }

    if (e.target.checked) dispatch(ADDTOPURCHASEALL());
    else dispatch(REMOVEFROMPURCHASEALL());
  };

  useEffect(() => {
    const listItemsShop = document.getElementsByClassName("contents");
    if (summarizeQuantity(purchase) === summarizeQuantity(products)) {
      const selectAll = document.getElementById("select-all");
      if (selectAll) selectAll.checked = true;
    }

    for (let shop of listItemsShop) {
      const shopName = shop.querySelector(".shop-name").innerText;
      const shopTitle = shop.querySelector(".shop-title");
      const shopItem = shop.querySelectorAll(".item");
      const foundItem = purchase.find((item) => item.name === shopName);
      if (foundItem) {
        shopTitle.querySelector(".checkbox").checked = true;
        for (let index = 0; index < foundItem.item.length; index++) {
          const element = foundItem.item[index];
          let nameItem = "";
          for (let a of shopItem) {
            nameItem = a.querySelector(".name-item").innerText;
            if (nameItem == element?.title) {
              a.querySelector(".checkbox").checked = true;
              break;
            }
          }
        }
      }
    }
  }, []);

  return (
    <React.Fragment>
      {products.length ? (
        <div className="max-w-4xl mx-auto">
          <div className="overflow-auto mt-3 hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="checkbox mr-3"
                        id="select-all"
                        onChange={selectAllProducts}
                      ></input>
                      Details
                    </div>
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">
                    Brand
                  </th>
                  <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">
                    Condition
                  </th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-center">
                    Price
                  </th>
                  <th className="w-32 p-3 text-sm font-semibold tracking-wide text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item, i) => (
                  <ItemShoppingCart shop={item} key={i} />
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
              alt="something"
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
