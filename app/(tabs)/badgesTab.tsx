import PrimaryButton from "@/components/PrimaryButton";
import { Text, View } from "dripsy";
import { useState } from "react";
import { getCourses } from "../../hooks/getCourses";

export default function BadgesScreen() {
   const [courses, setCourses] = useState<any>(null);

   async function handleFetchCourses() {
      try {
         const data = await getCourses(55.607296, 13.0449408);
         setCourses(data);
      } catch (error) {
         console.error("Error fetching courses:", error);
      }
   }

   return (
      <>
         <View
            sx={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
               bg: "$darkGreen",
            }}>
            <Text
               sx={{
                  fontSize: 36,
                  fontWeight: "bold",
                  color: "$white",
               }}>
               Badges
            </Text>
            <PrimaryButton
               title="Test Courses Scrape Function"
               onPress={() => {
                  handleFetchCourses();
               }}
            />
            {courses && (
               <Text
                  sx={{
                     fontSize: 16,
                     color: "$white",
                     mt: 20,
                  }}>
                  {JSON.stringify(courses, null, 2)}
               </Text>
            )}
         </View>
      </>
   );
}
