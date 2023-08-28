import { instance } from "./config";

export const getOrdersByUserId = async (id) => {
  try {
    const response = await instance.get(`/orders/${id}`);
    return response;
  } catch (err) {
    return err;
  }
};

export const createPaymentUrl = async (order) => {
  try {
    const data = await instance.post("/vnpay/create_payment_url", {
      order,
    });

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

export const getOrdersBySellerId = async (id, page, limit, searchQuery) => {
  try {
    const respone = await instance.get(`/orders/sellerId/${id}`, {
      params: {
        page: page,
        limit: limit,
        searchQuery: searchQuery,
      },
    });
    return respone;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error get products by seller id."
    );
  }
};

export const updateOrderStatusToDispatched = async (orderId) => {
  try {
    const response = await instance.put(`/orders/update/${orderId}`);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.error ||
        "Error updating order status to Dispatched."
    );
  }
};

export const getDailyIncomeBySeller = async (sellerId) => {
  try {
    const response = await instance.get(`/orders/income/daily/${sellerId}`);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error getting daily income by seller."
    );
  }
};

export const getDailyRefundBySeller = async (sellerId) => {
  try {
    const response = await instance.get(`/orders/refund/daily/${sellerId}`);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error getting daily refund by seller."
    );
  }
};

export const getIncomeBySellerIdForAllMonths = async (sellerId) => {
  try {
    const response = await instance.get(`/orders/income/allmonth/${sellerId}`);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error getting income by seller."
    );
  }
};

export const getRefundBySellerIdForAllMonths = async (sellerId) => {
  try {
    const response = await instance.get(`/orders/refund/allmonth/${sellerId}`);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error getting refund by seller."
    );
  }
};

export const getIncomeForAllMonths = async () => {
  try {
    const response = await instance.get("/orders/admin/income/allmonth");
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error getting income for all months."
    );
  }
};

export const getRefundForAllMonths = async () => {
  try {
    const response = await instance.get("/orders/admin/refund/allmonth");
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error getting refund for all months."
    );
  }
};

export const getIncomeForAllDeliveredOrders = async () => {
  try {
    const response = await instance.get("/orders/admin/income");
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.error ||
        "Error getting income for all delivered orders."
    );
  }
};

export const getCurrentMonthIncome = async () => {
  try {
    const response = await instance.get("/orders/admin/income/current/month");
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error getting current month income."
    );
  }
};

export const getCurrentYearIncome = async () => {
  try {
    const response = await instance.get("/orders/admin/income/current/year");
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error getting current year income."
    );
  }
};

export const paymentCash = async (order) => {
  console.log(order);
  try {
    const response = await instance.post("/vnpay/payment-cash", {
      order,
    });
    return response;
  } catch (err) {
    return err;
  }
};
