import { useMutation } from "@tanstack/react-query";
// Use mutation is for POST, PUT, DELETE requests

async function sendHealthData(payload: { data: string }) {
   const res = await fetch("https://chain-out.vercel.app/api/health", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
   });

   if (!res.ok) {
      throw new Error("Failed to send data");
   }
   return res.json();
}

export function useHealthMutation() {
   return useMutation({ mutationFn: sendHealthData });
}
