import { CONFIG } from "@/constants/config";

export async function getCourses(lat: number, lng: number) {
   try {
      const url = `${CONFIG.apiBaseUrl}/api/users/courses?location=${lat},${lng}`;
      console.log("Fetching courses from URL:", url);

      const res = await fetch(url, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
      });
      if (!res.ok) {
         throw new Error(`Failed to fetch courses": ${res.statusText}`);
      }

      const data = await res.json();
      return data;
   } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
   }
}
