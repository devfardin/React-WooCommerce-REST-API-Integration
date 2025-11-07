import axios from "axios";
import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";


// WooCommerce credentials
const baseURL = import.meta.env.VITE_BASEURL_URL;
const consumerKey = import.meta.env.VITE_CONSUMERKEY_KEY;
const consumerSecret = import.meta.env.VITE_CONSUMERSECRET_KEY;



// WooCommerce store details

// const baseURL = "http://e-commerce.local/wp-json/wc/v3";
// const consumerKey = "ck_7cbfe941198f1e34b62fc1218d04e7a7b9f927bc";
// const consumerSecret = "cs_ee4a551c4649a8ad05b7c5498089ba2740e48b67";

// Create OAuth instance
const oauth = new OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
  },
});

// Create Axios instance
const wooAPI = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to sign URL with OAuth
function signUrl(url, method = "GET", data = {}) {
  const requestData = { url, method, data };
  const oauthParams = oauth.authorize(requestData);
  const params = new URLSearchParams(oauthParams).toString();
  return `${url}?${params}`;
}

// Simple request function usable anywhere
export async function wooRequest(endpoint, method = "GET", data = {}) {
  const url = `${baseURL}${endpoint}`;
  const signedUrl = signUrl(url, method, data);

  if (method === "GET") {
    return wooAPI.get(signedUrl);
  } else if (method === "POST") {
    return wooAPI.post(signedUrl, data);
  } else if (method === "PUT") {
    return wooAPI.put(signedUrl, data);
  } else if (method === "DELETE") {
    return wooAPI.delete(signedUrl);
  }
}

// Export for external usage
export default wooRequest;
