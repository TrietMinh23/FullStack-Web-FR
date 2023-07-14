import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fakeapi } from "../../../api/config";

export default function ProductDetail() {
  const params = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    fakeapi.get(`/${params.slug}`).then((res) => setData(res.data));
  }, []);
  return (
    <section className="py-10">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex flex-wrap mb-24 -mx-4">
          <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
            <div className="sticky top-0 overflow-hidden ">
              <div className="relative mb-6 lg:mb-10 lg:h-96">
                <img
                  className="object-contain w-full lg:h-full"
                  src={data?.image}
                  alt={data?.title}
                />
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2">
            <div className="lg:pl-20">
              <div className="mb-6 ">
                <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                  {data?.title}
                </h2>
                <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                  <span> ${data?.price}</span>
                  <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">
                    $19.00
                  </span>
                </p>
              </div>
              <div className="mb-6">
                <h2 class="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                  Description :
                </h2>
                <p>{data?.description}</p>
              </div>
              <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                <span className="text-base text-gray-600 dark:text-gray-400">
                  In Stock
                </span>
                <p className="mt-2 text-sm text-blue-500 dark:text-blue-200">
                  Ships from china.
                  <span className="text-gray-600 dark:text-gray-400">
                    Most customers receive within 3-31 days.
                  </span>
                </p>
              </div>
              <div className="mb-6 " />
              <div className="flex flex-wrap items-center mb-6">
                <div className="mb-4 mr-4 lg:mb-0">
                  <div className="w-28">
                    <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                      <button className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                        <span className="m-auto text-2xl font-thin">-</span>
                      </button>
                      <input
                        type="number"
                        className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                        placeholder={1}
                      />
                      <button className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                        <span className="m-auto text-2xl font-thin">+</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mb-4 lg:mb-0">
                  <button className="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className=" bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                    </svg>
                  </button>
                </div>
                <a
                  href="#"
                  className="w-full px-4 py-3 text-center text-blue-600 bg-blue-100 border border-blue-600 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 hover:bg-blue-600 hover:text-gray-100 lg:w-1/2 rounded-xl"
                >
                  Add to cart
                </a>
              </div>
              <div className="flex gap-4 mb-6">
                <a
                  href="#"
                  className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                >
                  Buy now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
