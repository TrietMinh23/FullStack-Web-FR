import moment from "moment";
import qs from "qs";
import crypto from "crypto";
import config from "config";

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

export const createPaymentUrl = async (req, res, next) => {
  try {
    // process.env.TZ = "Asia/Ho_Chi_Minh";
    // const { _id, ...orderBody } = req.body.order;
    const orderBody = req.body.order;
    // const order = new Order(orderBody);
    // const orderData = await order.save();

    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    // const dataFormat = require("dataformat");

    const date = new Date();

    const createDate = moment(date).format("YYYYMMDDHHmmss");
    const orderId = moment(date).format("DDHHmmss");

    const tmnCode = config.get("vnp_TmnCode");
    const secretKey = config.get("vnp_HashSecret");
    let vnpUrl = config.get("vnp_Url");
    const returnUrl = config.get("vnp_ReturnUrl");

    let amount = orderBody.totalPrice;
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
    vnp_Params["vnp_TxnRef"] = orderId;
    // vnp_Params["vnp_OrderInfo"] = orderData._id + "";
    vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId; // Correct the orderInfo
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
      .cookie("orderId", orderId + "", { maxAge: 720000 })
      .json({ code: "00", vnpUrl });
    // res.json({ paymentUrl: vnpUrl });
  } catch (err) {
    next(err);
  }
};

export const getVnPayReturn = (req, res, next) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];

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
      // const result = await Order.findOneAndUpdate(
      //     { _id: vnp_Params["vnp_OrderInfo"] },
      //     { isPaid: true },
      //     { new: true }
      //   );
      // Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

      return res
        .cookie("vnp_params", JSON.stringify(vnp_Params), {
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
