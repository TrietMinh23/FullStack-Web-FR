import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updatedPayments } from "../../../../utils/redux/purchaseSlice";

export default function ModalPayments({ modal, closeModal }) {
  const [isCashPayment, setCashPayment] = useState(true);
  const [isVNPAYPayment, setVNPAYPayment] = useState(false);
  const dispatch = useDispatch();

  const handleCashPayment = () => {
    setCashPayment(true);
    setVNPAYPayment(false);
    console.log("Cash");
  };

  const handleVNPAYPayment = () => {
    setVNPAYPayment(true);
    setCashPayment(false);
    console.log("VNPAY");
  };

  const confirmPayments = () => {
    dispatch(
      updatedPayments({
        payments: isCashPayment ? "Cash" : "VNPAY",
      })
    );

    closeModal();
  };

  return (
    <div className={`${modal ? "block" : "hidden"}`}>
      {/* <div className="modal-wrapper p-7">
        <h1 className="text-lg mb-4">Choose a Payments unit</h1>
        <div className="sub-title">
          <h2 className="uppercase text-sm text-gray-600 font-semibold">
            PAYMENTS CHANNEL affiliated with FASHION REVIVE
          </h2>
          <p className="text-xs text-gray-500 mb-3">
          You can track your order on the FASHION REVIVE app when you choose one of the payment methods:
          </p>
        </div>
        <div
          onClick={() => handleCashPayment()}
          className="type p-5 border-l-4 bg-bright-gray border-red-600 mb-3 flex justify-between items-center cursor-pointer"
        >
          <div className="left-side">
            <div className="above flex">
              <div className="name mr-5">Thanh toán tiền mặt khi nhận được hàng</div>
            </div>    
          </div>
          <div className="right-side">
            {isCashPayment && <CheckIcon className="text-red-600" />}
          </div>
        </div>
        <div
          onClick={() => handleVNPAYPayment()}
          className="type cursor-pointer p-5 border-l-4 bg-bright-gray border-red-600 flex justify-between items-center"
        >
          <div className="left-side">
            <div className="above flex">
              <div className="name mr-5">Thanh toán qua cổng giao dịch VNPAY</div>      
            </div>
          </div>
          <div className="right-side">
            {isVNPAYPayment && <CheckIcon className="text-red-600" />}
          </div>
        </div>
        <div className="btn-group border-t-2 border-bright-gray mt-3 border-dashed pt-3 flex justify-end">
          <div
            onClick={confirmPayments}
            className="py-2 px-6 bg-red-500 hover:bg-red-600 rounded-md text-white cursor-pointer"
          >
            Finish
          </div>
        </div>
      </div> */}
  
    </div>
  );
}
