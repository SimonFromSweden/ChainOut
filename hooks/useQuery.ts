import { useQuery } from "@tanstack/react-query";

async function fetchHealthData() {
   const res = await fetch("https://chain-out.vercel.app/api/health", {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }
   return res.json();
}

export function useHealthQuery() {
   return useQuery({
      queryKey: ["health"], // cache key
      queryFn: fetchHealthData,
      enabled: false,
   });
}
