import { Course } from "./course";

export type Hole = {
   number: number;
   par: number;
   length: number;
   hasOb: boolean;
   geolocation: { lat: number; lng: number }[];
};

export type Layout = {
   id: string;
   name: string;
   difficulty: string;
   payToPlay: boolean;
   holes: Hole[];
   holesCount: number;
};

export type DetailedCourse = Course & {
   description?: string;
   address?: string;
   difficulty?: string;
   directions?: string;
   layouts?: Layout[];
};
