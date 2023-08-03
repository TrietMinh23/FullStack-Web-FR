import { instance } from "./config";

export const createPaymentUrl = async ({ order }) => {
  try {
    const { data } = await instance.post("/vnpay/create_payment_url", {
      order,
    });
    if (data) {
      if (data.code === "00") {
        window.location.href = data.vnpUrl;
      }
    }
  } catch (error) {
    console.error("Error creating payment URL:", error);
    throw error;
  }
};
