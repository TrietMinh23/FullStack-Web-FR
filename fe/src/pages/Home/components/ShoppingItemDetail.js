import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { instance } from "../../../api/config";
import { ToastContainer, toast } from "react-toastify";
import { ADDTOCART } from "../../../utils/redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheapIcon from "../../../assets/CheapIcon";
import CardSkeletonDetail from "../../../components/ui/CardSkeletonDetail";
import formatNumberWithCommas from "../../../utils/formatNumberWithCommas";
import StoreIcon from "@mui/icons-material/Store";
import PopupSeller from "./PopupSeller";
export default function ProductDetail() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [isWatchSeller, setWatchSeller] = useState(false);
  const dispatch = useDispatch();
  const currentShoppingCart = useSelector(
    (state) => state.product.shoppingCart
  );

  const notify = () =>
    toast.success("Add to cart successfully 🛒", {
      autoClose: 2000,
      icon: true,
    });

  const notifyFail = () => {
    toast.error("This product is already in your cart", {
      autoClose: 3000,
      icon: true,
    });
  };

  const addToCart = () => {
    // Check if product has been available in shopping cart
    if (currentShoppingCart.length) {
      let index;
      for (const item of currentShoppingCart) {
        if (item.name === data.sellerId.name) {
          index = item.item.findIndex((item) => item.id === data._id);
          if (index >= 0) {
            notifyFail();
            return;
          }
        }
      }

      if (index >= 0) return false;
    }

    // If the loop completes without finding a duplicate item, proceed to add to the cart
    dispatch(
      ADDTOCART({
        data,
      })
    );
    let listItem = JSON.parse(localStorage.getItem("cart"));
    listItem.products.push(data);
    console.log(listItem.products);
    localStorage.setItem("cart", JSON.stringify(listItem));

    notify();

    instance.post("/users/update_cart", {
      productId: params.slug,
      cartId: JSON.parse(localStorage.getItem("cart"))._id.replace(
        /^"(.*)"$/,
        "$1"
      ),
    });
  };

  useEffect(() => {
    instance
      .get(`products/${params.slug}`, null, {
        params: {
          id: params.slug,
        },
      })
      .then((res) => setData(res.data));
  }, [params.slug]);

  console.log(data);

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="xl:w-4/5 w-full mx-auto flex flex-wrap justify-center">
          {data ? (
            <React.Fragment>
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                src={data?.image}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <div className="mb-4">
                  <h2 className="title-font uppercasetracking-widest inline-block mr-3">
                    <StoreIcon className="mr-2"></StoreIcon>SHOP:
                  </h2>
                  <a
                    className="uppercase inline-block hover:scale-110 hover:text-blue-600 font-bold hover:underline transition-all"
                    onClick={() => setWatchSeller(!isWatchSeller)}
                  >
                    {data.sellerId?.name} shop
                  </a>
                  {isWatchSeller && (
                    <div className="flex lg:flex-row flex-col">
                      <PopupSeller />
                      <div id="dimScreen" className={"block"}></div>
                    </div>
                  )}
                </div>
                <h2 className="text-sm] title-font uppercase text-gray-500 tracking-widest">
                  BRAND : {data?.brandName}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 mt-3">
                  {data?.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex py-2">
                    <a href="/#" className="text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </a>
                    <a href="/#" className="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                      </svg>
                    </a>
                    <a href="/#" className="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{data?.description}</p>
                <div className="mt-6 pb-5 border-b-2 border-gray-200 mb-5"></div>
                <div>
                  <div className="first-part">
                    <div className="sub-first-part">
                      <div className="py-4 px-3 bg-lotion">
                        <div className="above">
                          <span className="title-font font-medium text-2xl text-gray-900">
                            Price :{" "}
                            <span className="text-4xl text-venetian-red">
                              {formatNumberWithCommas(data?.price)}
                            </span>
                            <span className="text-venetian-red">₫</span>
                          </span>
                        </div>
                        <div className="below flex mt-2">
                          <div className="flex items-center">
                            <CheapIcon />
                          </div>
                          <div className="ml-3">
                            <div>
                              <div className="text-venetian-red">
                                Anything Cheap
                              </div>
                            </div>
                            <div className="text-xs">
                              Best price compared to other products on the
                              market on Fashion Revive
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h2 className="mb-2 text-lg font-semibold text-gray-900">
                          PRODUCT DETAILS:
                        </h2>
                        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                          <li>
                            Color : <span>{data?.color}</span>
                          </li>
                          <li>
                            {" "}
                            Category :{" "}
                            <div className="inline-block">
                              <div className="flex">
                                {data?.category.map((item, i) => (
                                  <p key={i} className="px-1">
                                    {item}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="second-part flex mt-6 md:items-center sm:flex-row flex-col">
                    <button
                      onClick={addToCart}
                      className="block text-center max-sm:w-full max-sm:mb-2 max-sm:block text-white bg-green-sheen hover:bg-emerald border-0 py-3 px-7 focus:outline-none rounded"
                    >
                      Add To Cart
                    </button>
                    <ToastContainer />

                    <div className="max-sm:grow">
                      <Link
                        to="/purchase"
                        onClick={addToCart}
                        className="block text-center sm:ml-3 w-full max-sm:block text-white bg-red-500 hover:bg-red-600 border-0 py-3 px-7 focus:outline-none rounded"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <CardSkeletonDetail />
          )}
        </div>
      </div>
    </section>
  );
}
