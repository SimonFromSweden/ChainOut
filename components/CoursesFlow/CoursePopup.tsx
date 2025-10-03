import { Text, View } from "dripsy";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type CoursePopupProps = {
   id: string;
   name: string;
   holes: number;
   par: number;
};

const CoursePopup: React.FC<CoursePopupProps> = ({ id, name, holes, par }) => {
   return (
      <View sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
         <Text sx={{ fontSize: 32, fontFamily: "NunitoBold", color: "white" }}>
            {name}
         </Text>
         <View>
            <Text sx={{ fontSize: 13, color: "$lightGray" }}>
               {holes} holes
            </Text>
            <Text sx={{ fontSize: 13, color: "$lightGray" }}>{par} par</Text>
         </View>
         <View sx={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <TouchableOpacity style={styles.buttonLeft}>
               <Text style={styles.buttonTextLeft}>Press Me</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRight}>
               <Text style={styles.buttonTextRight}>Press Me</Text>
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
      backgroundColor: "$buttonGreen", // #3e6d1d
      borderRadius: 6,
   },
   buttonRight: {
      marginTop: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: "#78d43a",
      borderRadius: 6,
   },
   buttonTextLeft: {
      color: "#afbbaf",
      fontSize: 16,
   },
   buttonTextRight: {
      color: "#000",
      fontSize: 16,
   },
});
