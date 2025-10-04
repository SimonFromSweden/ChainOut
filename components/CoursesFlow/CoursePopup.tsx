import { getCourseById } from "@/hooks/getCourseById";
import { useCourseStore } from "@/store/courseStore";
import { Course, DetailedCourse } from "@/types/course";
import { normalizeDetailedCourse } from "@/utils/normalizeDetailedCourse";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "dripsy";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type CoursePopupProps = {
   course: Course | null;
   onClose?: () => void;
};

const CoursePopup = ({ course, onClose }: CoursePopupProps) => {
   const router = useRouter();
   const { setCourse } = useCourseStore();

   if (!course) return null; // nothing selected → no popup

   const handlePress = async (id: string, action: "info" | "start") => {
      try {
         console.log("Fetching detailed data for course:", id);
         const apiData = await getCourseById(id);
         const normalized: DetailedCourse = normalizeDetailedCourse(apiData);
         console.log("Normalized detailed course:", normalized);

         // Store detailed course globally
         setCourse(normalized);

         // Navigate depending on which button was pressed
         if (action === "info") router.push(`/(courses)/CourseInfo?id=${id}`);
         if (action === "start") router.push(`/(courses)/CreateRound?id=${id}`);
      } catch (error) {
         console.error("Error loading course details:", error);
      }
   };

   return (
      <View
         sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
         }}>
         <View
            sx={{
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-between",
            }}>
            <Text
               sx={{ fontSize: 20, fontFamily: "NunitoBold", color: "white" }}>
               {course.name}
            </Text>
            <TouchableOpacity
               style={{
                  position: "relative",
                  bottom: 16,
                  left: 6,
                  paddingLeft: 4,
                  marginTop: 2,
               }}
               onPress={onClose}>
               <Ionicons name="close-outline" size={34} color="white" />
            </TouchableOpacity>
         </View>

         <View
            sx={{
               display: "flex",
               flexDirection: "row",
               gap: 6,
               position: "relative",
               bottom: 6,
            }}>
            <Text sx={{ fontSize: 13, color: "$lightGray" }}>
               {course.holes} holes
            </Text>
            <Text sx={{ fontSize: 13, color: "$lightGray" }}>·</Text>
            <Text sx={{ fontSize: 13, color: "$lightGray" }}>
               Par {course.par}
            </Text>
         </View>
         <View
            sx={{
               display: "flex",
               flexDirection: "row",
               justifyContent: "center",
               gap: 8,
               alignSelf: "center",
            }}>
            <TouchableOpacity
               style={styles.buttonLeft}
               onPress={() => handlePress(course._id, "info")}>
               <Text style={styles.buttonTextLeft}>Course Page</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={styles.buttonRight}
               onPress={() => handlePress(course._id, "start")}>
               <Text style={styles.buttonTextRight}>Start Round</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default CoursePopup;

const styles = StyleSheet.create({
   buttonLeft: {
      marginTop: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: "#3e6d1d",
      borderRadius: 10,
   },
   buttonRight: {
      marginTop: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: "#78d43a",
      borderRadius: 10,
   },
   buttonTextLeft: {
      color: "#fff",
      fontSize: 16,
   },
   buttonTextRight: {
      color: "#000",
      fontSize: 16,
   },
});
