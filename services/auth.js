import { api, setToken } from "./api";

export async function login(email, password) {
   const { data } = await api.post("/api/auth/login", { email, password });

   // Assume backend returns { token, user }
   await setToken(data.token);

   return data.user;
}

export async function logout() {
   await setToken(null);
}
