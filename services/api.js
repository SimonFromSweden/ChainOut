import { CONFIG } from "@/constants/config";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const api = axios.create({
   baseURL: CONFIG.apiBaseUrl,
   headers: {
      "Content-Type": "application/json",
   },
   timeout: 15000,
});

let accessToken = null;

// Store/remove token securely
export async function setToken(token) {
   accessToken = token;
   if (token) {
      await SecureStore.setItemAsync("access_token", token);
   } else {
      await SecureStore.deleteItemAsync("access_token");
   }
}

// Load token at startup
export async function loadToken() {
   accessToken = await SecureStore.getItemAsync("access_token");
   return accessToken;
}

// Attach token to requests
api.interceptors.request.use(async (config) => {
   if (!accessToken) {
      accessToken = await SecureStore.getItemAsync("access_token");
   }
   if (accessToken) {
      console.log("🔑 Adding token", `Bearer ${accessToken}`);
      config.headers.Authorization = `Bearer ${accessToken}`;
   } else {
      console.log(
         "⚠️ No access token found, sending request without Authorization header"
      );
   }
   return config;
});

// Auto-logout on 401
api.interceptors.response.use(
   (res) => res,
   async (err) => {
      if (err?.response?.status === 401) {
         await setToken(null);
         // TODO: trigger navigation to login
      }
      return Promise.reject(err);
   }
);
