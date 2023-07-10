import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { SETROLE } from "../../utils/redux/authSlice";
import { Link } from "react-router-dom";

export default function ChooseType() {
  const [isBuyerSelected, setBuyerSelected] = useState(true);
  const [isSellerSelected, setSellerSelected] = useState(false);
  const dispatch = useDispatch();

  const handleBuyerClick = () => {
    setBuyerSelected(true);
    setSellerSelected(false);
  };

  const handleSellerClick = () => {
    setSellerSelected(true);
    setBuyerSelected(false);
  };

  const Continue = () => {
    dispatch(
      SETROLE({
        payload: {
          role: isBuyerSelected ? "buyer" : "seller",
        },
      })
    );
  };

  return (
    <div className="flex lg:flex-row flex-col">
      <div
        id="box"
        className="flex flex-col bg-[#79B695] lg:w-1/4 w-full md:h-screen"
      >
        <div
          id="one"
          className="flex flex-row items-center sm:mt-8 ml-5 text-white"
        >
          <GoDotFill />
          <p className="ml-3">Fashion Revive</p>
        </div>

        <div
          id="two"
          className="md:mt-44 max-md:mb-4 max-md:mt-8 px-10 text-white"
        >
          <h1 className="text-center text-2xl sm:mb-6 mb-4 font-bold leading-10">
            Technology creates an "addictive" experience
          </h1>
          <h2 className="px-5 md:text-justify text-start leading-8">
            Website based on fashion sharing platform and community launched in
            2023.
          </h2>
        </div>
      </div>
      <div className="flex grow items-center">
        <div className="w-full px-4 my-4 md:my-0 md:px-0 sm:max-w-md mx-auto lg:ml-40">
          <div>
            <h1 className="text-2xl font-bold">Choose Account Type</h1>
            <p className="text-[#B4BCC7]">
              Optimized account type for each other user
            </p>
            <div className="relative flex flex-col">
              <div className="mt-12">
                <div className="mt-3">
                  <input
                    type="radio"
                    id="buyer"
                    className="hidden"
                    name="chooseAccount"
                    value="buyer"
                    checked={isBuyerSelected}
                    onChange={() => handleBuyerClick()}
                  />
                  <label
                    htmlFor="buyer"
                    onClick={() => handleBuyerClick()}
                    className={`border-2 px-4 py-6 rounded-2xl text-2xl flex flex-row ${
                      isBuyerSelected
                        ? "bg-[#E5F6EF] border-green-sheen"
                        : "bg-white"
                    }`}
                  >
                    <BsShop className="mr-3 self-center text-5xl" />
                    <div className="ml-4 font-bold ">
                      <p className="self-center">Buyer</p>
                      <p className="text-xs text-silver-sand">
                        For user buy more
                      </p>
                    </div>
                  </label>
                </div>

                <div className="mt-3 mb-8">
                  <input
                    type="radio"
                    id="seller"
                    className="hidden"
                    name="chooseAccount"
                    value="seller"
                    checked={isSellerSelected}
                    onChange={() => handleSellerClick()}
                  />
                  <label
                    htmlFor="seller"
                    onClick={() => handleSellerClick()}
                    className={`border-2 px-4 py-6 rounded-2xl text-2xl flex flex-row ${
                      isSellerSelected
                        ? "bg-[#E5F6EF] border-green-sheen"
                        : "bg-white"
                    }`}
                  >
                    <MdOutlineLocalGroceryStore className="mr-3 self-center text-5xl" />

                    <div className="ml-4 font-bold">
                      <p className="self-center">Seller</p>
                      <p className="text-xs text-silver-sand">
                        For user sell more
                      </p>
                    </div>
                  </label>
                </div>

                <Link
                  to="/login"
                  onClick={Continue}
                  className="px-14 py-4 bg-[#79B695] rounded-2xl text-white"
                >
                  Continue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
