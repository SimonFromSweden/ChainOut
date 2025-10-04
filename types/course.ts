export interface HoleGeolocation {
   lat: number;
   lng: number;
}

export interface Hole {
   holeNumber: number;
   par: number;
   length: number;
   hasOb: boolean;
   hasMandatory: boolean;
   hasHazard: boolean;
   hasLocalRule: boolean;
   geolocation: HoleGeolocation[];
}

export interface LayoutVersion {
   id: string;
   createdAt: string; // keep as string, parse to Date if needed
   holes: Hole[];
}

export type LayoutType = "PUBLIC" | "PRIVATE" | string;
export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | string;

export interface Layout {
   id: string;
   type: LayoutType;
   name: string;
   description?: string;
   difficulty: Difficulty;
   payToPlay: boolean;
   courseId: string;
   courseName: string;
   latestVersion: LayoutVersion;
}

export interface NormalizedLayout {
   _id: string;
   id: string;
   name: string;
   difficulty: string;
   payToPlay: boolean;
   holes: Hole[];
   par: number;
}

export type DetailedCourse = {
   _id: string;
   id: string;
   name: string;
   address: string;
   description?: string;
   geolocation: { lat: number; lng: number };
   layouts: NormalizedLayout[];
};

export type Course = {
   _id: string;
   id: string;
   name: string;
   address?: string;
   geolocation?: {
      lat: number;
      lng: number;
   };
   layouts?: Layout[];
   holes?: number;
   par?: number;
};
