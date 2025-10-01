import PrimaryButton from "@/components/PrimaryButton";
import { Text, View } from "dripsy";
import * as Location from "expo-location";
import { useState } from "react";
import { getCourses } from "../../hooks/getCourses";

export default function BadgesScreen() {
   const [courses, setCourses] = useState<any>(null);
   const [locationError, setLocationError] = useState<string | null>(null);

   async function handleFetchCourses() {
      try {
         // Ask permission
         let { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== "granted") {
            setLocationError("Permission to access location was denied");
            return;
         }

         // Get current position
         let location = await Location.getCurrentPositionAsync({});
         const { latitude, longitude } = location.coords;
         console.log("📍 User coordinates:", latitude, longitude);

         // Call API with users location location
         const data = await getCourses(latitude, longitude);
         setCourses(data);
      } catch (error) {
         console.error("Error fetching courses:", error);
         setLocationError("Failed to get location");
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
               title="Test getCourses Function"
               onPress={() => {
                  handleFetchCourses();
               }}
            />

            {/* Show location error if any */}
            {locationError && (
               <Text sx={{ fontSize: 16, color: "red", mt: 16 }}>
                  {locationError}
               </Text>
            )}

            {/* Show courses if fetched */}
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
