import axios from "axios";

export const createAnOrder = async (orderData) => {
  const CONSUMER_KEY = "ck_7cbfe941198f1e34b62fc1218d04e7a7b9f927bc";
  const CONSUMER_SECRET = "cs_ee4a551c4649a8ad05b7c5498089ba2740e48b67";
  const PROJECT_URL = "http://e-commerce.local/";
  const API_URL = `${PROJECT_URL}wp-json/wc/v3/orders`;

  try {
    const response = await axios.post(API_URL, orderData, {
      auth: {
        username: CONSUMER_KEY,
        password: CONSUMER_SECRET,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Order created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error placing order:", error.response?.data || error.message);
    throw error;
  }
};
