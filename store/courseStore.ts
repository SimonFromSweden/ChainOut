import { DetailedCourse } from "@/types/course";
import { create } from "zustand";

type CourseStore = {
   currentCourse: DetailedCourse | null;
   setCourse: (course: DetailedCourse) => void;
   clearCourse: () => void;
};

export const useCourseStore = create<CourseStore>((set) => ({
   currentCourse: null,
   setCourse: (course) => set({ currentCourse: course }),
   clearCourse: () => set({ currentCourse: null }),
}));
