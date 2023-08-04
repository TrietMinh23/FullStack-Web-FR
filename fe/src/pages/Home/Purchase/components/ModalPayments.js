import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { createPaymentUrl } from "../../../../api/order";

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
            amount={productPrice}
          />
          <PaymentDetailsRow label="Shipping Total" amount={shipPrice} />
          <tr>
            <th className="text-left">Total Payment:</th>
            <td className="text-right pl-4 py-2 text-3xl font-semibold text-red-500">
              ₫{productPrice + shipPrice}
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
}

// Component CheckoutModal
export default function CheckoutModal() {
  // Sử dụng useSelector để lấy dữ liệu từ Redux store
  const payments = useSelector((state) => state.purchase.payments);
  const shippingPrice = useSelector((state) => state.purchase.shipPrice);
  const productPrice = useSelector((state) => state.purchase.productPrice);

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
    constructor(user, shipping, orderItems, itemsPrice, payment = "VNPAY") {
      this.isPaid = false;
      this.isDelivered = false;
      this.orderItems = orderItems;
      this.user = user;
      this.shipping = shipping;
      this.itemsPrice = itemsPrice;
      this.shippingPrice = 0;
      this.totalPrice = this.shippingPrice + this.itemsPrice;
      this.payment = payment;
    }
  }

  // Thông tin người dùng
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  // Thông tin địa chỉ giao hàng
  const shipping = {
    address: "123 Main Street",
    city: "New York",
    country: "USA",
  };

  // Danh sách sản phẩm trong giỏ hàng
  const cartItems = [
    {
      id: 1,
      name: "Product 1",
      price: 10,
      checked: true,
    },
    {
      id: 2,
      name: "Product 2",
      price: 20,
      checked: false,
    },
  ];

  // Chọn các sản phẩm đã được chọn trong giỏ hàng
  const selectCartItems = cartItems.filter((item) => item.checked);

  // Tổng giá trị đơn hàng
  const total = 20000;

  // Tạo đơn hàng mới
  const order = new Order(user, shipping, selectCartItems, total);

  // Xử lý sự kiện khi người dùng click vào nút "Place Order"
  const handlePlaceOrderClick = useCallback(async () => {
    try {
      // Gửi yêu cầu tạo URL thanh toán với thông tin đơn hàng
      await createPaymentUrl({ order });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error creating payment URL:", error);
    } finally {
    }
  }, [order]);

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
            productPrice={productPrice}
            shipPrice={shippingPrice}
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
