import { getCourses } from "@/hooks/getCourses";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import { useCallback, useState } from "react";
import {
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const snazzyStyle = require("./snazzyStyle118475.json");

export default function MapScreen() {
   const [courses, setCourses] = useState<any[]>([]);
   const [locationError, setLocationError] = useState<string | null>(null);
   const [userLocation, setUserLocation] = useState<{
      latitude: number;
      longitude: number;
   } | null>(null);
   const [mode, setMode] = useState<"map" | "list">("map");
   const [search, setSearch] = useState("");

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

   // simple search filter
   const filteredCourses = courses.filter((c) =>
      c.name?.toLowerCase().includes(search.toLowerCase())
   );

   return (
      <View style={styles.container}>
         {locationError ? (
            <Text style={{ color: "red", padding: 16 }}>{locationError}</Text>
         ) : mode === "map" ? (
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
                  <Marker coordinate={userLocation} title="You are here">
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
         ) : (
            // List view fallback
            <View style={{ flex: 1, padding: 20 }}>
               {filteredCourses.map((course, idx) => (
                  <Text key={idx} style={{ paddingVertical: 6 }}>
                     📍 {course.name} – {course.address}
                  </Text>
               ))}
            </View>
         )}

         {/* 🔍 Search overlay */}
         <View style={styles.searchContainer}>
            <TextInput
               placeholder="Search courses..."
               value={search}
               onChangeText={setSearch}
               style={styles.searchInput}
            />
         </View>

         {/* 🔘 Toggle overlay */}
         <View style={styles.toggleContainer}>
            <TouchableOpacity
               style={[
                  styles.toggleButtonLeft,
                  mode === "map" && styles.activeButton,
               ]}
               onPress={() => setMode("map")}>
               <Text style={styles.toggleText}>Map</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={[
                  styles.toggleButtonRight,
                  mode === "list" && styles.activeButton,
               ]}
               onPress={() => setMode("list")}>
               <Text style={styles.toggleText}>List</Text>
            </TouchableOpacity>
         </View>
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
   searchContainer: {
      position: "absolute",
      top: 15,
      left: 20,
      right: 20,
      backgroundColor: "#afbbaf",
      opacity: 0.8,
      borderRadius: 8,
      padding: 8,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
   },
   searchInput: {
      height: 40,
      fontSize: 16,
      color: "#5c5e53",
   },
   toggleContainer: {
      position: "absolute",
      bottom: 15,
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "center",
   },
   toggleButtonLeft: {
      backgroundColor: "#576f59",
      color: "#afbbaf",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
   },
   toggleButtonRight: {
      backgroundColor: "#576f59",
      color: "#afbbaf",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
   },
   activeButton: {
      backgroundColor: "#4CAF50",
   },
   toggleText: {
      color: "white",
      fontWeight: "bold",
   },
});
