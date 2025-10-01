import { loadToken } from "@/services/api";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function RootIndex() {
   const [token, setToken] = useState<string | null | undefined>(undefined);

   useEffect(() => {
      async function init() {
         const savedToken = await loadToken(); // 🔑 load from SecureStore
         setToken(savedToken);
      }
      init();
   }, []);

   if (token === undefined) {
      // still loading token, maybe show splash or nothing
      return null;
   }

   // If no token → onboarding
   if (!token) {
      return <Redirect href="/(onboarding)" />;
   }

   // If token exists → go to tabs (or profile/home/etc)
   return <Redirect href="/(tabs)" />;
}
