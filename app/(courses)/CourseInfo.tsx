import { getCourseById } from "@/hooks/getCourseById";
import { useCourseStore } from "@/store/courseStore";
import { normalizeDetailedCourse } from "@/utils/normalizeDetailedCourse";
import { Text, View } from "dripsy";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

const CourseInfo = () => {
   const { id } = useLocalSearchParams<{ id: string }>();
   const { currentCourse, setCourse } = useCourseStore();
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const loadCourseIfNeeded = async () => {
         if (!currentCourse && id) {
            setLoading(true);
            try {
               const apiData = await getCourseById(id as string);
               const normalized = normalizeDetailedCourse(apiData);
               setCourse(normalized);
            } catch (error) {
               console.error("Error fetching course:", error);
            } finally {
               setLoading(false);
            }
         }
      };
      loadCourseIfNeeded();
   }, [id]);

   if (loading || !currentCourse) {
      return (
         <View
            sx={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
               backgroundColor: "#000",
            }}>
            <ActivityIndicator size="large" color="#78d43a" />
            <Text sx={{ color: "#fff", marginTop: 10 }}>
               Loading course info...
            </Text>
         </View>
      );
   }
   return (
      <View style={{ padding: 20 }}>
         <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
            {currentCourse.name}
         </Text>
         <Text style={{ color: "#aaa", marginTop: 5 }}>
            {currentCourse.address}
         </Text>
         <Text style={{ color: "#aaa", marginTop: 5 }}>
            {currentCourse.description}
         </Text>

         <View style={{ marginTop: 16 }}>
            {currentCourse.layouts.map((layout) => (
               <View
                  key={layout.id}
                  style={{
                     backgroundColor: "#1d1d1d",
                     borderRadius: 10,
                     padding: 10,
                     marginBottom: 8,
                  }}>
                  <Text style={{ color: "white", fontSize: 16 }}>
                     {layout.name}
                  </Text>
                  <Text style={{ color: "#aaa" }}>
                     Par {layout.par} · {layout.holes.length} holes
                  </Text>
               </View>
            ))}
         </View>
      </View>
   );
};

export default CourseInfo;

const styles = StyleSheet.create({
   button: {
      marginTop: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: "#007AFF",
      borderRadius: 6,
   },
   buttonText: {
      color: "#fff",
      fontSize: 16,
   },
});
