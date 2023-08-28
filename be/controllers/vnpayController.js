import moment from "moment";
import qs from "qs";
import crypto from "crypto";
import config from "config";
import { Order, Payment, Shipping } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

function generateRandomTransactionId(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let transactionId = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    transactionId += characters.charAt(randomIndex);
  }
  return transactionId;
}

function parseTransactionString(inputString) {
  const transactionMessages = inputString.split("%0A");
  const transactions = [];

  for (const message of transactionMessages) {
    const messageParts = message.replace(/\+/g, " ").split(" ");
    const transactionInfo = {};

    if (messageParts.length >= 9) {
      if (messageParts[3] === "ma" && messageParts[4] === "GD%3A") {
        transactionInfo["Mã giao dịch"] = messageParts[5];
      }

      if (
        messageParts[6] === "Ma" &&
        messageParts[7] === "don" &&
        messageParts[8] === "hang" &&
        messageParts[9] === "%3A"
      ) {
        transactionInfo["Mã đơn hàng"] = messageParts[10];
      }

      const amountIndex = messageParts.indexOf("So") + 2;
      transactionInfo["Số tiền"] = messageParts[amountIndex];
    }

    if (Object.keys(transactionInfo).length > 0) {
      transactions.push(transactionInfo);
    }
  }

  return transactions;
}

export const createPaymentUrl = async (req, res, next) => {
  try {
    // process.env.TZ = "Asia/Ho_Chi_Minh";
    // const { _id, ...orderBody } = req.body.order;
    const orders = JSON.parse(req.body.order);
    const totalPriceOrders = orders.reduce((a, b) => a + b.totalPrice, 0);

    async function processOrders(orders) {
      const listOrderId = [];

      for (const item of orders) {
        const {
          products,
          orderby,
          shipping,
          orderStatus,
          totalPrice,
          paymentMethod,
          quantity,
        } = item;

        const newShipping = new Shipping(shipping);
        const newPayment = new Payment({
          paymentMethod,
        });

        try {
          await newShipping.save();
          await newPayment.save();

          const newOrder = new Order({
            products,
            totalPrice,
            quantity,
            orderby,
            orderStatus,
            payment: newPayment._id,
            shipping: newShipping._id,
          });

          await newOrder.save();
          listOrderId.push(newOrder);
        } catch (error) {
          console.error("Error processing order:", error);
        }
      }

      return listOrderId;
    }

    processOrders(orders)
      .then((listOrderId) => {
        const ipAddr =
          req.headers["x-forwarded-for"] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          req.connection.socket.remoteAddress;

        // const dataFormat = require("dataformat");
        // Create message
        let message = "";
        for (let item of listOrderId) {
          message += `Thanh toan cho ma GD: ${generateRandomTransactionId(
            11
          )} Ma don hang : ${item._id} So tien ${item.totalPrice} VND\n`;
        }

        const date = new Date();

        const createDate = moment(date).format("YYYYMMDDHHmmss");
        const OI = moment(date).format("DDHHmmss");

        const tmnCode = config.get("vnp_TmnCode");
        const secretKey = config.get("vnp_HashSecret");
        let vnpUrl = config.get("vnp_Url");
        const returnUrl = config.get("vnp_ReturnUrl");

        let amount = totalPriceOrders;
        if (isNaN(amount) || amount <= 0) {
          return res.status(400).json({ error: "Invalid amount" });
        }

        let bankCode = "";

        let locale = "vn";

        let currCode = "VND";

        let vnp_Params = {};
        vnp_Params["vnp_Version"] = "2.1.0";
        vnp_Params["vnp_Command"] = "pay";
        vnp_Params["vnp_TmnCode"] = tmnCode;
        vnp_Params["vnp_Locale"] = locale;
        vnp_Params["vnp_CurrCode"] = currCode;
        vnp_Params["vnp_TxnRef"] = OI;
        vnp_Params["vnp_OrderInfo"] = message; // Correct the orderInfo
        vnp_Params["vnp_OrderType"] = "other";
        vnp_Params["vnp_Amount"] = amount * 100;
        vnp_Params["vnp_ReturnUrl"] = returnUrl;
        vnp_Params["vnp_IpAddr"] = ipAddr;
        vnp_Params["vnp_CreateDate"] = createDate;
        if (bankCode !== null && bankCode !== "") {
          vnp_Params["vnp_BankCode"] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        const signData = qs.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

        vnp_Params["vnp_SecureHash"] = signed;
        vnpUrl += "?" + qs.stringify(vnp_Params, { encode: false });

        res
          .cookie("orderId", listOrderId + "", { maxAge: 720000 })
          .json({ code: "00", paymentUrl: vnpUrl });
      })
      .catch((error) => {
        console.error("Error processing orders:", error);
      });
  } catch (err) {
    next(err);
  }
};

export const getVnPayReturn = async (req, res, next) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];
  let responseCode = vnp_Params["vnp_ResponseCode"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  const tmnCode = config.get("vnp_TmnCode");
  const secretKey = config.get("vnp_HashSecret");

  let querystring = qs.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(querystring, "utf-8")).digest("hex");

  if (secureHash === signed) {
    try {
      const OrderDetail = parseTransactionString(vnp_Params["vnp_OrderInfo"]);
      for (let i of OrderDetail) {
        const order = await Order.findById(i["Mã đơn hàng"]);
        const payment = await Payment.findById(order.payment);
        payment.paymentDetail = i;
        await payment.save();
        if (responseCode === "00") {
          const productIds = order.products.map((product) => product._id);
          await Product.updateMany(
            { _id: { $in: productIds } },
            { $set: { sold: 1 } }
          );
          console.log("Cập nhật dữ liệu thành công.");
        }
      }

      return res
        .cookie("vnp_params", encodeURIComponent(JSON.stringify(vnp_Params)), {
          maxAge: 720000,
        })
        .redirect(`http://localhost:3000/purchase`);
    } catch (err) {
      next(err);
    }
  } else {
    res
      .cookie("vnpay", "fail", vnp_Params["vnp_OrderInfo"], { maxAge: 720000 })
      .redirect(`http://localhost:3000/purchase/`);
  }
};

export const paymentCash = async (req, res) => {
  try {
    const orders = JSON.parse(req.body.order);

    async function processOrders(orders) {
      let listOrder = [];
      for (const item of orders) {
        const {
          products,
          orderby,
          shipping,
          orderStatus,
          totalPrice,
          paymentMethod,
          quantity,
        } = item;

        const newShipping = new Shipping(shipping);
        const newPayment = new Payment({
          paymentMethod,
        });

        try {
          await newShipping.save();
          await newPayment.save();

          const newOrder = new Order({
            products,
            totalPrice,
            quantity,
            orderby,
            orderStatus,
            payment: newPayment._id,
            shipping: newShipping._id,
          });

          await newOrder.save();
          listOrder.push(newOrder);
        } catch (error) {
          res.status(400).json({ error: error });
          return;
        }
      }

      return listOrder;
    }

    const order = await processOrders(orders);

    for (let i of order) {
      const orderItem = await Order.findById(i._id);
      const productIds = orderItem.products.map((product) => product._id);
      await Product.updateMany(
        { _id: { $in: productIds } },
        { $set: { sold: 1 } }
      );
    }
    res.status(200).json({ message: "Cập nhật dữ liệu thành công." });
    return;
  } catch (err) {
    res.status(400).json({ error: err });
    return;
  }
};
