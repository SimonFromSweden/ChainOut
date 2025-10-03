import { Course, Layout } from "@/types/course";

export function normalizeCourses(rawData: any[]): Course[] {
   return rawData.map((c: any) => {
      const layouts: Layout[] = c.layouts.map((l: any) => ({
         id: l.id,
         type: l.type,
         name: l.name,
         description: l.description,
         difficulty: l.difficulty,
         payToPlay: l.payToPlay,
         courseId: l.courseId,
         courseName: l.courseName,
         latestVersion: {
            id: l.latestVersion.id,
            createdAt: l.latestVersion.createdAt,
            holes: l.latestVersion.holes.map((h: any) => ({
               holeNumber: h.holeNumber,
               par: h.par,
               length: h.length,
               hasOb: h.hasOb,
               hasMandatory: h.hasMandatory,
               hasHazard: h.hasHazard,
               hasLocalRule: h.hasLocalRule,
               geolocation: h.geolocation?.map((g: any) => ({
                  lat: g.lat,
                  lng: g.lng,
               })),
            })),
         },
      }));

      // 🏆 pick layout with the most holes
      const bestLayout =
         layouts.length > 0
            ? layouts.reduce((prev, curr) =>
                 curr.latestVersion.holes.length >
                 prev.latestVersion.holes.length
                    ? curr
                    : prev
              )
            : null;

      const holes = bestLayout?.latestVersion.holes.length ?? 0;

      const par =
         bestLayout?.latestVersion.holes.reduce(
            (acc, h) => acc + (h.par ?? 0),
            0
         ) ?? 0;

      return {
         id: c.id,
         name: c.name,
         address: c.address,
         geolocation: c.geolocation
            ? { lat: c.geolocation.lat, lng: c.geolocation.lng }
            : undefined,
         layouts,
         holes,
         par,
      };
   });
}
