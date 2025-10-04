import { getCourseById } from "@/hooks/getCourseById";
import { useCourseStore } from "@/store/courseStore";
import { normalizeDetailedCourse } from "@/utils/normalizeDetailedCourse";
import { Text, View } from "dripsy";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";

const CreateRound = () => {
   const { id } = useLocalSearchParams<{ id: string }>();
   const { currentCourse, setCourse } = useCourseStore();
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const loadCourseIfNeeded = async () => {
         if (!currentCourse && id) {
            setLoading(true);
            try {
               const apiData = await getCourseById(id);
               const normalized = normalizeDetailedCourse(apiData);
               setCourse(normalized);
            } catch (error) {
               console.error("Error loading course:", error);
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
               Loading course details...
            </Text>
         </View>
      );
   }

   return (
      <View sx={{ flex: 1, padding: 20, backgroundColor: "#000" }}>
         <Text sx={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>
            Create a Round at {currentCourse.name}
         </Text>

         <Text sx={{ color: "#aaa", marginTop: 5 }}>
            Choose a layout to start playing:
         </Text>

         <View sx={{ marginTop: 16 }}>
            {currentCourse.layouts.map((layout) => (
               <TouchableOpacity
                  key={layout.id}
                  style={styles.layoutButton}
                  onPress={() => console.log("Selected layout:", layout.name)}>
                  <Text style={styles.layoutName}>{layout.name}</Text>
                  <Text style={styles.layoutInfo}>
                     Par {layout.par} · {layout.holes.length} holes
                  </Text>
               </TouchableOpacity>
            ))}
         </View>
      </View>
   );
};

export default CreateRound;

const styles = StyleSheet.create({
   layoutButton: {
      backgroundColor: "#1d1d1d",
      borderRadius: 10,
      padding: 12,
      marginBottom: 10,
   },
   layoutName: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
   },
   layoutInfo: {
      color: "#aaa",
      fontSize: 14,
   },
});
