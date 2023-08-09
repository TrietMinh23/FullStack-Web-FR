import { instance } from "./config";

export const createPaymentUrl = async (order) => {
  try {
    const data = await instance.post("/vnpay/create_payment_url", {
      order,
    });

    console.log("CHECK", data);

    if (data.data) {
      if (data.data.code === "00") {
        window.location.href = data.data.paymentUrl;
      }
    }
  } catch (error) {
    console.error("Error creating payment URL:", error);
    throw error;
  }
};
