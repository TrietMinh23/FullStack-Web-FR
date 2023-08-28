import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { createPaymentUrl, paymentCash } from "../../../../api/order";
import getCookie from "../../../../utils/getCookie";
import validatePhoneNumber from "../../../../utils/validatePhone";
import setCookie from "../../../../utils/setCookie";
import formatNumberWithCommas from "../../../../utils/formatNumberWithCommas";

// Component hiển thị thông tin chi tiết về thanh toán
function PaymentDetailsRow({ label, amount }) {
  return (
    <tr>
      <th className="text-left">{label}:</th>
      <td className="text-right pl-4 py-2">₫{amount}</td>
    </tr>
  );
}

// Component chứa thông tin giá sản phẩm và giá vận chuyển
function PaymentDetails({ productPrice, shipPrice }) {
  return (
    <div className="bg-white px-6 py-4 items-center justify-end flex">
      <table>
        <thead>
          <PaymentDetailsRow
            label="Merchandise Subtotal"
            amount={formatNumberWithCommas(productPrice)}
          />
          <PaymentDetailsRow label="Shipping Total" amount={formatNumberWithCommas(shipPrice)} />
          <tr>
            <th className="text-left">Total Payment:</th>
            <td className="text-right pl-4 py-2 text-3xl font-semibold text-red-500">
              ₫{formatNumberWithCommas(productPrice + shipPrice)}
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
}

// Component CheckoutModal
export default function CheckoutModal({ formData }) {
  // Sử dụng useSelector để lấy dữ liệu từ Redux store
  const payments = useSelector((state) => state.purchase.payments);
  const shippingPrice = useSelector((state) => state.purchase.shipPrice);
  const productPrice = useSelector((state) => state.purchase.productPrice);
  const products = useSelector((state) => state.product.shoppingCart);

  console.log("CHECK", products);

  // Biến chứa nhãn phương thức thanh toán dựa vào dữ liệu từ Redux store
  let paymentMethodLabel = "";
  if (payments === "Cash") {
    paymentMethodLabel = "Cash on Delivery";
  } else if (payments === "VNPAY") {
    paymentMethodLabel = "Payment via VNPAY transaction portal";
  }

  const dispatch = useDispatch();

  // Lớp đại diện cho đơn hàng
  class Order {
    constructor(
      user,
      shipping,
      orderItems,
      itemsPrice,
      status,
      payment = "VNPAY"
    ) {
      this.orderStatus = status;
      this.products = orderItems;
      this.orderby = user;
      this.shipping = shipping;
      this.totalPrice = itemsPrice;
      this.paymentMethod = payment;
      this.quantity = orderItems.length;
    }
  }

  if (getCookie("vnp_params")) {
    console.log(JSON.parse(decodeURIComponent(getCookie("vnp_params"))));
  }

  let totalOrder = [];
  // Xử lý sự kiện khi người dùng click vào nút "Place Order"
  const handlePlaceOrderClick = async () => {
    if (!validatePhoneNumber(formData.phone)) {
      alert("Your phone is not valid");
      return;
    } else if (
      !formData.city ||
      !formData.district ||
      !formData.ward ||
      !formData.address
    ) {
      alert("Your address is not valid");
      return;
    }
    // Tạo đơn hàng mới
    const arrAddress = localStorage
      .getItem("address")
      .replace(/^"(.*)"$/, "$1")
      .split(",");
    for (let i of products) {
      const orderById = localStorage.getItem("_id").replace(/^"(.*)"$/, "$1");
      const shippingAddress = {
        address: arrAddress[0],
        ward: arrAddress[1],
        district: arrAddress[2],
        city: arrAddress[3],
      };
      const productList = i.item.map((item) => item._id);
      const totalBill = 
        i.item.reduce(
          (accumulator, product) => accumulator + product.price,
          0
        ) + shippingPrice;
      const order = new Order(
        orderById,
        shippingAddress,
        productList,
        totalBill,
        "Processing"
      );
      totalOrder.push(order);
    }


    if (payments === "Cash") {
      paymentCash(JSON.stringify(totalOrder))
        .then((res) => {
          console.log(res);
          setCookie("vnp_params", { vnp_ResponseCode: "00" }, 3 * 60 * 60);
          setTimeout(window.location.reload(), 1500);
        })
        .catch((err) => console.log("Error creating payment URL:", err));
    } else {
      // Gửi yêu cầu tạo URL thanh toán với thông tin đơn hàng
      createPaymentUrl(JSON.stringify(totalOrder))
        .then((res) => console.log(res))
        .catch((err) => console.log("Error creating payment URL:", err));
    }
  };

  // Render giao diện của component
  return (
    <div>
      {paymentMethodLabel && (
        <div>
          <h1 className="bg-white px-6 py-4 flex items-center">
            {paymentMethodLabel}
          </h1>
          <hr />
          <PaymentDetails
            productPrice={(productPrice)}
            shipPrice={(shippingPrice)}
          />
        </div>
      )}
      <hr />
      <div className="bg-white px-6 py-4 flex items-center">
        <p className="text-gray-500 text-xs">
          By clicking "Place Order", you are agreeing to{" "}
          <span className="text-blue-500">
            Fashion-Revive's General Transaction Terms
          </span>
        </p>
        <div className="grow flex justify-center">
          <button
            onClick={handlePlaceOrderClick}
            className="ml-2 bg-dark-jungle-green text-white p-2 rounded-sm md:w-1/2 w-32"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
