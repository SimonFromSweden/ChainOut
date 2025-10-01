import { CONFIG } from "@/constants/config";
import { api } from "@/services/api";

export async function getCourses(lat: number, lng: number) {
   try {
      const url = `${CONFIG.apiBaseUrl}/api/users/courses?location=${lat},${lng}`;
      console.log("Fetching courses from URL:", url);

      const res = await api.get(url); // using services/api.js
      return res.data.courses;
   } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
   }
}
