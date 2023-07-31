import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fakeapi } from "../../../api/config";
import { ToastContainer, toast } from "react-toastify";
import { ADDTOCART } from "../../../utils/redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardSkeletonDetail from "../../../components/ui/CardSkeletonDetail";

export default function ProductDetail() {
  const demoShop = "AB SHOP";
  const params = useParams();
  const [data, setData] = useState(null);
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
    for (const item of currentShoppingCart || []) {
      if (item.name === demoShop) {
        const index = item.item.findIndex((item) => item.name === data.title);
        if (index >= 0) {
          notifyFail();
          return false; // Function ends here
        }
      }
    }

    // If the loop completes without finding a duplicate item, proceed to add to the cart
    notify();
    dispatch(
      ADDTOCART({
        id: data.id,
        name: data.title,
        image: data.image,
        price: data.price,
        shop: demoShop,
        quantity: 1,
      })
    );
  };

  useEffect(() => {
    fakeapi.get(`/${params.slug}`).then((res) => setData(res.data));
  }, [params.slug]);

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
                <h2 className="text-sm title-font uppercase text-gray-500 tracking-widest">
                  {data?.category}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
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
                      <div>
                        <span className="title-font font-medium text-2xl text-gray-900">
                          Price :{" "}
                          <span className="text-4xl">{data?.price}</span> $
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="second-part flex mt-6 md:items-center sm:flex-row flex-col">
                    {localStorage.getItem("currentUser") ? (
                      <React.Fragment>
                        <div className="sm:mr-4 max-sm:w-full max-sm:mb-2">
                          <Link
                            to="/login"
                            className="flex text-center ml-auto max-sm:w-full max-sm:block text-white bg-green-sheen hover:bg-emerald border-0 py-3 px-7 focus:outline-none rounded"
                          >
                            Add To Cart
                          </Link>
                        </div>
                        <div className="max-sm:grow">
                          <Link
                            to="/login"
                            className="flex text-center ml-auto w-full max-sm:block text-white bg-red-500 hover:bg-red-600 border-0 py-3 px-7 focus:outline-none rounded"
                          >
                            Buy Now
                          </Link>
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
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
                      </React.Fragment>
                    )}
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
