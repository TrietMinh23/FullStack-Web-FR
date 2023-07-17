import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updatedShipping } from "../../../../utils/redux/purchaseSlice";

export default function ModalShipping({ modal, closeModal }) {
  const [isFastShipping, setFastShipping] = useState(true);
  const [isNormalShipping, setNormalShipping] = useState(false);
  const dispatch = useDispatch();

  const handleFastShipping = () => {
    setFastShipping(true);
    setNormalShipping(false);
  };

  const handleNormalShipping = () => {
    setFastShipping(false);
    setNormalShipping(true);
  };

  const confirmShipping = () => {
    dispatch(
      updatedShipping({
        shipping: isFastShipping ? "Fast" : "Normal",
      })
    );

    closeModal();
  };

  return (
    <div
      className={`modal absolute bg-white z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] ${
        modal ? "block" : "hidden"
      }`}
    >
      <div className="modal-wrapper p-7">
        <h1 className="text-lg mb-4">Choose a shipping unit</h1>
        <div className="sub-title">
          <h2 className="uppercase text-sm text-gray-600 font-semibold">
            SHIPPING CHANNEL affiliated with FASHION REVIVE
          </h2>
          <p className="text-xs text-gray-500 mb-3">
            You can track your order on Shopee app when you choose one of the
            shipping units:
          </p>
        </div>
        <div
          onClick={() => handleFastShipping()}
          className="type p-5 border-l-4 bg-bright-gray border-red-600 mb-3 flex justify-between items-center cursor-pointer"
        >
          <div className="left-side">
            <div className="above flex">
              <div className="name mr-5">Normal</div>
              <div className="price text-red-500 font-semibold">₫12.800</div>
            </div>
            <div className="below text-xs mt-1">
              Nhận hàng vào 18 Th07 - 19 Th07
            </div>
          </div>
          <div className="right-side">
            {isFastShipping && <CheckIcon className="text-red-600" />}
          </div>
        </div>
        <div
          onClick={() => handleNormalShipping()}
          className="type cursor-pointer p-5 border-l-4 bg-bright-gray border-red-600 flex justify-between items-center"
        >
          <div className="left-side">
            <div className="above flex">
              <div className="name mr-5">Normal</div>
              <div className="price text-red-500 font-semibold">₫12.800</div>
            </div>
            <div className="below text-xs mt-1">
              Nhận hàng vào 18 Th07 - 19 Th07
            </div>
          </div>
          <div className="right-side">
            {isNormalShipping && <CheckIcon className="text-red-600" />}
          </div>
        </div>
        <div className="btn-group border-t-2 border-bright-gray mt-3 border-dashed pt-3 flex justify-end">
          <div
            onClick={confirmShipping}
            className="py-2 px-6 mr-4 rounded-md hover:bg-gray-200 cursor-pointer"
          >
            Back
          </div>
          <div
            onClick={confirmShipping}
            className="py-2 px-6 bg-red-500 hover:bg-red-600 rounded-md text-white cursor-pointer"
          >
            Finish
          </div>
        </div>
      </div>
    </div>
  );
}
