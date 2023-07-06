import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { BsShop } from "react-icons/bs";

export default function ChooseType() {
  const [isBuyerSelected, setBuyerSelected] = useState(true);
  const [isSellerSelected, setSellerSelected] = useState(false);

  const handleBuyerClick = () => {
    setBuyerSelected(true);
    setSellerSelected(false);
  };

  const handleSellerClick = () => {
    setSellerSelected(true);
    setBuyerSelected(false);
  };

  return (
    <div className="flex flex-row">
      <div id="box" className="flex flex-col bg-[#79B695] w-1/4 h-screen">
        <div
          id="one"
          className="flex flex-row items-center mt-8 ml-5 text-white"
        >
          <GoDotFill />
          <p className="ml-3">Fashion Revive</p>
        </div>

        <div id="two" className="mt-44 text-white">
          <h1 className="text-center text-2xl font-bold leading-10">
            Technology creates an "addictive" experience
          </h1>
          <h2 className="text-start ml-16 mr-14 mt-3 leading-8">
            Website based on fashion sharing platform and community launched in
            2023.
          </h2>
        </div>
      </div>
      <div className="mt-32 ml-44 w-1/4">
        <div>
          <h1 className="text-2xl font-bold">Choose Account Type</h1>
          <p className="text-[#B4BCC7]">
            Optimized account type for each <br /> other user
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
                  className={`border-[#79B695] border-2 px-4 py-6 rounded-2xl font-bold text-2xl flex flex-row ${
                    isBuyerSelected ? "bg-[#E5F6EF]" : "bg-white"
                  }`}
                >
                  <BsShop className="mr-3 self-center text-5xl" />

                  <p className="self-center ml-12">Buyer</p>
                </label>
              </div>

              <div className="mt-3">
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
                  className={`border-[#79B695] border-2 px-4 py-6 rounded-2xl font-bold text-2xl flex flex-row ${
                    isSellerSelected ? "bg-[#E5F6EF]" : "bg-white"
                  }`}
                >
                  <MdOutlineLocalGroceryStore className="mr-3 self-center text-5xl" />

                  <p className="self-center ml-12">Seller</p>
                </label>
              </div>

              <button className="mt-10 px-14 py-4 bg-[#79B695] rounded-2xl text-white">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
