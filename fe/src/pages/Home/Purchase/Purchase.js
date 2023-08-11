import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ItemCart from "./components/ItemCart";
import TableItemResponsive from "./components/TableItemResponsive";
import ModalShipping from "./components/ModalShipping";
import SuccessfullForm from "./components/SuccessfullForm";
import UnsuccessFullForm from "./components/UnsuccessFullForm";
import PopupChangeInfo from "./components/PopUp/PopupChangeInfo";
import CheckoutModal from "./components/ModalPayments";

import {
  updatedPayments,
  updatedProductPrice,
} from "../../../utils/redux/purchaseSlice";
import getCookie from "../../../utils/getCookie";
import { instance } from "../../../api/config";

export default function Purchase() {
  const [VNpaySuccessful, setVNPaySucessful] = useState(false);
  const [statePayment, setStatePayment] = useState(false);

  const [modalIsOpen, setModalOpen] = useState(false);

  const [isCashPayment, setCashPayment] = useState(true);
  const [isVNPAYPayment, setVNPAYPayment] = useState(false);
  const dispatch = useDispatch();
  const address = localStorage.getItem("address").split(",") || [];
  {
    console.log(address);
  }
  const [isChange, setIsChange] = useState(false);
  const shipping = useSelector((state) => state.purchase.shipping);
  const products = useSelector((state) => state.product.shoppingCart);
  const [information, setInformation] = useState({
    name: localStorage.getItem("name").replace(/^"(.*)"$/, "$1") || "",
    phone:
      localStorage
        .getItem("mobile")
        .replace(/^"(.*)"$/, "$1")
        .search("__MOBILE_NULL_FOR_") >= 0
        ? ""
        : localStorage.getItem("mobile").replace(/^"(.*)"$/, "$1"),
    city: address[3] || "",
    district: address[2] || "",
    ward: address[1] || "",
    address: address[0] || "",
  });

  const changeShipping = () => {
    setModalOpen(!modalIsOpen);
    const bodyModal = document.getElementsByClassName("body-modal")[0];

    if (document.body.contains(bodyModal)) {
      document.body.classList.remove("body-modal");
    } else {
      document.body.classList.add("body-modal");
    }
  };

  const handleChangeInput = (event) => {
    setInformation({
      ...information,
      [event.target.name]: event.target.value,
    });
  };

  const finishUpdateInfomation = () => {
    localStorage.setItem(
      "address",
      `${information.address}, ${information.ward}, ${information.district}, ${information.city}`
    );
    localStorage.setItem("mobile", information.phone);
    localStorage.setItem("name", information.name);

    instance
      .post("/users/update_information", {
        userId: localStorage.getItem("_id").replace(/^"(.*)"$/, "$1"),
        address: `${information.address}, ${information.ward}, ${information.district}, ${information.city}`,
        phone: information.phone,
        name: localStorage.getItem("name").replace(/^"(.*)"$/, "$1"),
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setIsChange(false);
  };

  const closeUpdateInfomation = () => {
    setIsChange(false);
    setInformation({
      name: "",
      phone: "",
      city: "",
      district: "",
      ward: "",
      address: "",
    });
  };

  const handleCashPayment = () => {
    setCashPayment(true);
    setVNPAYPayment(false);
    dispatch(
      updatedPayments({
        payments: "Cash",
      })
    );
  };

  const handleVNPAYPayment = () => {
    setVNPAYPayment(true);
    setCashPayment(false);
    dispatch(
      updatedPayments({
        payments: "VNPAY",
      })
    );
  };

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
    dispatch(
      updatedProductPrice({
        productPrice: sum,
      })
    );

    return sum;
  };

  useEffect(() => {
    setStatePayment(
      JSON.parse(decodeURIComponent(getCookie("vnp_params")))?.vnp_ResponseCode
    );
  }, []);

  return (
    <React.Fragment>
      {statePayment ? (
        statePayment === "24" ? (
          <UnsuccessFullForm />
        ) : (
          <SuccessfullForm />
        )
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="infomation-customer bg-white px-3 pb-2">
            <div className="flex justify-between">
              <div className="title text-red-500 font-bold py-2 ml-2">
                <FmdGoodIcon />
                <span>Delivery Address</span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => setIsChange(!isChange)}
                  className="text-blue-400 font-bold max-lg:w-full lg:py-0 py-3 px-3"
                >
                  Change
                </button>
              </div>
            </div>
            <div className="flex lg:flex-row flex-col">
              {isChange && (
                <PopupChangeInfo
                  changeFunc={(event) => handleChangeInput(event)}
                  close={() => closeUpdateInfomation()}
                  open={() => finishUpdateInfomation()}
                />
              )}
              <div className="flex gap-x-3 ml-2">
                <div className="name font-bold">
                  <p>{information.name ? information.name : "No name"}</p>
                </div>
                <div className="phone font-bold">
                  <p>
                    {information.phone !== ""
                      ? information.phone
                      : "No phone number"}
                  </p>
                </div>
                <div className="address">
                  <p>
                    {localStorage.getItem("address")
                      ? localStorage
                          .getItem("address")
                          .replace(/^"(.*)"$/, "$1")
                      : "No address"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="products-item pb-2 mt-6">
            <div className="bg-white text-red-600 px-3 py-3 flex items-center">
              <div className="border-r border-red-600 pr-3 flex items-center text-2xl">
                <ShoppingBagIcon />
                <span className="font-semibold max-sm:text-sm">
                  Fashion Revive
                </span>
              </div>
              <div className="ml-3">
                <h1 className="">Product Ordered</h1>
              </div>
            </div>
            <div className="products">
              <div>
                <div className="overflow-auto mt-3 shadow hidden md:block">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
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
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products?.map((item, i) => (
                        <ItemCart shop={item} key={i}></ItemCart>
                      ))}
                    </tbody>
                  </table>
                </div>
                <TableItemResponsive products={products} />
                <div className="shipping bg-bright-gray">
                  <div className="wapper px-6 py-4 flex justify-between md:flex-row flex-col">
                    <div className="flex max-md:justify-between">
                      <h1 className="text-steel-teal font-bold md:text-xl text-sm">
                        Shipping Option
                      </h1>
                      <div className="md:ml-10">
                        <span>{shipping}</span>
                        <div className="time-recieve text-xs text-gray-800">
                          Nhận hàng vào 18 Th07 - 19 Th07
                        </div>
                      </div>
                      <div className="btn-change">
                        <button
                          onClick={changeShipping}
                          className="uppercase ml-3 text-lg text-blue-600"
                        >
                          change
                        </button>
                        <ModalShipping
                          at={document.documentElement.scrollTop}
                          modal={modalIsOpen}
                          closeModal={changeShipping}
                        />
                      </div>
                      <div
                        id="dimScreen"
                        className={modalIsOpen || isChange ? "block" : "hidden"}
                      ></div>
                    </div>
                    <div className="total lg:mt-0 mt-5 max-lg:text-right">
                      Order Total ({summarizeQuantity(products)} items){" "}
                      <span className="text-lg text-red-400 ml-3">
                        {summarizePrice(products)}₫
                      </span>
                    </div>
                  </div>
                </div>

                <div className="payments-method pb-2 mt-6">
                  <div className="bg-white px-6 py-4 flex items-center">
                    <div className="border-r border-red-600 pr-3 items-center text-2xl">
                      <span className="font-bold md:text-xl text-sm">
                        Payment Method
                      </span>
                    </div>
                    <div className="grow flex md:gap-10 md:ml-20 gap-2 ml-2">
                      <div className="method-cash btn-change md:w-1/6 w-16">
                        <button
                          onClick={handleCashPayment}
                          className={`uppercase text-sm border-2 w-full py-2 bg-gray-300 ${
                            isCashPayment
                              ? "border-gray-500 text-black"
                              : "text-white  hover:border-gray-500 hover:text-black"
                          }`}
                        >
                          CASH
                        </button>
                      </div>
                      <div className="method-VNPAY btn-change md:w-1/6 w-16">
                        <button
                          onClick={handleVNPAYPayment}
                          className={`uppercase text-sm border-2 w-full py-2 bg-gray-300 ${
                            isVNPAYPayment
                              ? "border-gray-500 text-black"
                              : "text-white  hover:border-gray-500 hover:text-black"
                          }`}
                        >
                          VNPAY
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <CheckoutModal />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
