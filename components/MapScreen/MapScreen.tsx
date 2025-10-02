import { getCourses } from "@/hooks/getCourses";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const snazzyStyle = require("./snazzyStyle118475.json");

export default function MapScreen() {
   const [courses, setCourses] = useState<any[]>([]);
   const [locationError, setLocationError] = useState<string | null>(null);
   const [userLocation, setUserLocation] = useState<{
      latitude: number;
      longitude: number;
   } | null>(null);

   useFocusEffect(
      useCallback(() => {
         let isActive = true;

         const handleFetchCourses = async () => {
            try {
               // Ask permission
               let { status } =
                  await Location.requestForegroundPermissionsAsync();
               if (status !== "granted") {
                  setLocationError("Permission to access location was denied");
                  return;
               }

               // Get current position
               let location = await Location.getCurrentPositionAsync({});
               const { latitude, longitude } = location.coords;
               setUserLocation({ latitude, longitude });
               console.log("📍 User coordinates:", latitude, longitude);

               // Call API with user’s location
               const coursesData = await getCourses(latitude, longitude);
               console.log("📦 coursesData:", coursesData);

               if (isActive) {
                  setCourses(coursesData ?? []);
               }
            } catch (error) {
               console.error("❌ Error fetching courses:", error);
               setLocationError("Failed to get location or courses");
            }
         };

         handleFetchCourses();

         return () => {
            isActive = false;
         };
      }, [])
   );

   return (
      <View style={styles.container}>
         {locationError ? (
            <Text style={{ color: "red", padding: 16 }}>{locationError}</Text>
         ) : (
            <MapView
               style={styles.map}
               provider={PROVIDER_GOOGLE} // ensures Google Maps on iOS too
               customMapStyle={snazzyStyle}
               initialRegion={{
                  latitude: userLocation?.latitude ?? 55.607296, // Malmö, Sweden
                  longitude: userLocation?.longitude ?? 13.0449408,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
               }}>
               {/* User location marker */}
               {userLocation && (
                  <Marker
                     coordinate={userLocation}
                     title="You are here"
                     pinColor="blue">
                     <Ionicons name="person" size={38} color="#e4af1d" />
                  </Marker>
               )}
               {/* Courses markers */}
               {courses
                  .filter(
                     (course) =>
                        course.geolocation &&
                        typeof course.geolocation.lat === "number" &&
                        typeof course.geolocation.lng === "number"
                  )
                  .map((course, i) => (
                     <Marker
                        key={i}
                        coordinate={{
                           latitude: course.geolocation.lat,
                           longitude: course.geolocation.lng,
                        }}
                        title={course.name ?? "Unnamed Course"}
                        description={course.address ?? ""}
                        pinColor="#17cf17"
                     />
                  ))}
            </MapView>
         )}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   map: {
      flex: 1,
   },
});
