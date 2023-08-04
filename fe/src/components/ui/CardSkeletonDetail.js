import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CheapIcon from "../../assets/CheapIcon";
import React from "react";

export default function CardSkeletonDetail() {
  return (
    <section className="w-full text-gray-700 body-font overflow-hidden bg-white">
      <div className="container mx-auto">
        <div className="xl:w-4/5 w-full mx-auto flex flex-wrap justify-center">
          <div className="lg:w-1/2 w-full object-cover object-center max-lg:h-[700px]">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font uppercase text-gray-500 tracking-widest">
              BRAND : <Skeleton height={20} width={100} />
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 mt-3">
              <Skeleton height={30} className="w-full" />
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
            <p className="leading-relaxed">
              <Skeleton height={20} className="w-full" count={4} />
            </p>
            <div className="mt-6 pb-5 border-b-2 border-gray-200 mb-5"></div>
            <div>
              <div className="first-part">
                <div className="sub-first-part">
                  <div className="py-4 px-3 bg-lotion">
                    <div className="above">
                      <span className="title-font font-medium text-2xl text-gray-900">
                        Price :{" "}
                        <span className="text-4xl text-venetian-red inline-block">
                          <Skeleton height={30} width={100} />
                        </span>
                        <span className="text-venetian-red inline-block">
                          ₫
                        </span>
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
                          Best price compared to other products on the market on
                          Fashion Revive
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
                        <Skeleton height={20} width={200} />
                      </li>
                      <li>
                        <Skeleton height={20} width={200} />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="second-part flex mt-6 md:items-center sm:flex-row flex-col">
                <button className="block text-center max-sm:w-full max-sm:mb-2 max-sm:block text-white bg-green-sheen hover:bg-emerald border-0 py-3 px-7 focus:outline-none rounded">
                  Add To Cart
                </button>
                <div className="max-sm:grow">
                  <button className="block text-center sm:ml-3 w-full max-sm:block text-white bg-red-500 hover:bg-red-600 border-0 py-3 px-7 focus:outline-none rounded">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
