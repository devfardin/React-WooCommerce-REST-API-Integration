import axios from "axios";
import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";

// WooCommerce credentials
const baseURL = `${import.meta.env.VITE_BASEURL_URL}/wc/v3`;
const consumerKey = import.meta.env.VITE_CONSUMERKEY_KEY;
const consumerSecret = import.meta.env.VITE_CONSUMERSECRET_KEY;

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

// ✅ Fixed: don't include `data` in signUrl for POST/PUT — only use URL + method
function signUrl(url, method = "GET") {
  const requestData = { url, method };
  const oauthParams = oauth.authorize(requestData);
  const params = new URLSearchParams(oauthParams).toString();
  return `${url}?${params}`;
}

// ✅ Fixed POST handler — keep your structure unchanged
export async function wooRequest(endpoint, method = "GET", data = {}) {
  const url = `${baseURL}${endpoint}`;
  const signedUrl = signUrl(url, method);

  // Handle GET requests with query parameters
  if (method === "GET") {
  const [path, queryString] = endpoint.split("?");

  const urlNoParams = `${baseURL}${path}`;

  // Parse query params from endpoint
  let queryParams = {};
  if (queryString) {
    queryString.split("&").forEach(pair => {
      const [key, value] = pair.split("=");
      queryParams[key] = value;
    });
  }

  // Include query params in OAuth signing
  const requestData = {
    url: urlNoParams,
    method: "GET",
    data: queryParams
  };

  const oauthParams = oauth.authorize(requestData);

  // Final query = original params + OAuth params
  const finalQuery = new URLSearchParams({
    ...queryParams,
    ...oauthParams
  }).toString();

  const finalUrl = `${urlNoParams}?${finalQuery}`;

  return await wooAPI.get(finalUrl);
} else if (method === "POST") {
    return await wooAPI.post(signedUrl, data); // now sends JSON body correctly
  } else if (method === "PUT") {
    return await wooAPI.put(signedUrl, data);
  } else if (method === "DELETE") {
    return await wooAPI.delete(signedUrl);
  }
}

// Export for external usage
export default wooRequest;
