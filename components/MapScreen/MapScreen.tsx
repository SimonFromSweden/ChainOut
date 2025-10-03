import { getCourses } from "@/hooks/getCourses";
import { Course } from "@/types/course";
import { normalizeCourses } from "@/utils/normalizeCourses";
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
import CoursePopup from "../CoursesFlow/CoursePopup";

const snazzyStyle = require("./snazzyStyle118475.json");

export default function MapScreen() {
   const [rawCourses, setRawCourses] = useState<any[]>([]);
   const [courses, setCourses] = useState<any[]>([]);
   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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
               const rawCoursesData = await getCourses(latitude, longitude);
               // console.log("📦 coursesData:", rawCoursesData);

               // Set Raw Course Data (in JSON-format)
               if (isActive) {
                  setRawCourses(rawCoursesData ?? []);

                  requestAnimationFrame(() => {
                     const normalized = normalizeCourses(rawCoursesData ?? []);
                     if (isActive) {
                        setCourses(normalized);
                        console.log("✅ normalizedCourses:", normalized);
                     }
                  });
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
               style={{ flex: 1 }}
               provider={PROVIDER_GOOGLE}
               toolbarEnabled={false}
               initialRegion={{
                  latitude: userLocation?.latitude ?? 55.607296,
                  longitude: userLocation?.longitude ?? 13.0449408,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
               }}
               customMapStyle={snazzyStyle}>
               {/* Show user location marker */}
               {userLocation && (
                  <Marker coordinate={userLocation} title="You are here">
                     <Ionicons name="person" size={38} color="#e4af1d" />
                  </Marker>
               )}

               {/* Show fetched courses markers */}
               {filteredCourses.map((course, idx) => (
                  <Marker
                     key={idx}
                     coordinate={{
                        latitude: course.geolocation.lat,
                        longitude: course.geolocation.lng,
                     }}
                     pinColor="#17cf17"
                     onPress={() => {
                        setSelectedCourse(course);
                     }}
                  />
               ))}
            </MapView>
         ) : (
            <View style={{ flex: 1, padding: 20 }}>
               {filteredCourses.map((course, idx) => (
                  <Text key={idx} style={{ paddingVertical: 6 }}>
                     📍 {course.name} – {course.address}
                  </Text>
               ))}
            </View>
         )}

         {selectedCourse && (
            <View style={styles.popupOverlay}>
               {/* Outside area - closes on press */}
               <TouchableOpacity
                  style={StyleSheet.absoluteFill} // full screen invisible layer
                  activeOpacity={1}
                  onPress={() => setSelectedCourse(null)}
               />

               {/* Inside popup - stops presses from closing */}
               <View style={styles.popupContainer}>
                  <CoursePopup
                     course={selectedCourse}
                     onClose={() => setSelectedCourse(null)}
                  />
               </View>
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
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
   },
   toggleButtonRight: {
      backgroundColor: "#576f59",
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
   popupOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.35)", // dim background
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
   },
   popupContainer: {
      backgroundColor: "#102111",
      opacity: 0.9,
      borderRadius: 16,
      padding: 20,
      width: "85%",
      maxWidth: 400,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6, // Android shadow
      alignItems: "center", // center content horizontally
   },
});
