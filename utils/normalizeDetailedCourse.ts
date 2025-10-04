import { DetailedCourse, NormalizedLayout } from "@/types/course";

/**
 * Helper to normalize difficulty labels for nicer display.
 * Example: "ADVANCED" → "Advanced"
 */
function formatDifficulty(difficulty: string): string {
   if (!difficulty) return "Unknown";
   return (
      difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()
   );
}

/**
 * Normalize a raw API course response into our DetailedCourse type.
 */
export function normalizeDetailedCourse(apiCourse: any): DetailedCourse {
   if (!apiCourse) throw new Error("Invalid course data");

   return {
      _id: apiCourse._id,
      id: apiCourse.id,
      name: apiCourse.name || "Unnamed Course",
      address: apiCourse.address || "No address provided",
      description: apiCourse.description || "",
      geolocation: apiCourse.geolocation || { lat: 0, lng: 0 },

      layouts:
         apiCourse.layouts?.map((layout: any): NormalizedLayout => {
            const holes = layout.latestVersion?.holes || [];

            // Calculate total par safely
            const totalPar = holes.reduce(
               (sum: number, hole: any) => sum + (hole.par || 0),
               0
            );

            return {
               _id: layout._id,
               id: layout.id,
               name: layout.name || "Unnamed Layout",
               difficulty: formatDifficulty(layout.difficulty),
               payToPlay: !!layout.payToPlay,
               holes,
               par: totalPar,
            };
         }) || [],
   };
}
