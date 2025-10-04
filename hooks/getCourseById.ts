import { CONFIG } from "@/constants/config";
import { api } from "@/services/api";

export async function getCourseById(id: string) {
   try {
      const url = `${CONFIG.apiBaseUrl}/users/get-course-by-id?courseId=${id}`;
      console.log("Fetching course from URL:", url);

      const res = await api.get(url); // using services/api.js

      // Unwrap possible layers
      let course = res.data?.course;

      // Some endpoints may wrap it as { courses: [{ course: {...} }] }
      if (!course && Array.isArray(res.data?.courses)) {
         const first = res.data.courses[0];
         course = first?.course ?? first;
      }

      if (!course) throw new Error("No course found in response");

      console.log("Unwrapped course object:", course);
      return course;
   } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
   }
}
