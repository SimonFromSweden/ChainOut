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
   type: "PUBLIC" | "PRIVATE" | string;
   name: string;
   description?: string;
   difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | string;
   payToPlay: boolean;
   courseId: string;
   courseName: string;
   latestVersion: LayoutVersion;
}

export type Course = {
   id: string;
   name: string;
   address?: string;
   geolocation?: {
      lat: number;
      lng: number;
   };
   layouts: Layout[];

   holes?: number;
   par?: number;
};
