import { api, loadToken, setToken } from "@/services/api";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
const router = useRouter();

type AuthContextType = {
   userToken: string | null;
   login: (email: string, password: string) => Promise<boolean>;
   logout: () => Promise<void>;
   loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [userToken, setUserToken] = useState<string | null>(null);
   const [loading, setLoading] = useState(true);

   // 🔹 Startup check
   useEffect(() => {
      const startupCheck = async () => {
         const token = await loadToken();
         setUserToken(token);
         setLoading(false);
      };
      startupCheck();
   }, []);

   // 🔹 Login
   const login = async (email: string, password: string) => {
      try {
         const response = await api.post("/auth/login", {
            email,
            password,
         });
         const token = response.data?.token;
         if (token) {
            await setToken(token);
            setUserToken(token);
            router.replace("/(tabs)");
            return true;
         }
         return false;
      } catch (err) {
         if (axios.isAxiosError(err)) {
            console.error("❌ Login failed:", {
               status: err.response?.status,
               data: err.response?.data,
               headers: err.response?.headers,
            });
         } else {
            console.error("❌ Unexpected error:", err);
         }
         return false;
      }
   };

   // 🔹 Logout
   const logout = async () => {
      try {
         await setToken(null); // this already clears SecureStore
         setUserToken(null);
         router.replace("/(onboarding)");
      } catch (err) {
         console.error("Error logging out:", err);
      }
   };

   return (
      <AuthContext.Provider value={{ userToken, login, logout, loading }}>
         {children}
      </AuthContext.Provider>
   );
};

// Custom hook for easy use
export const useAuth = () => {
   const ctx = useContext(AuthContext);
   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
   return ctx;
};
