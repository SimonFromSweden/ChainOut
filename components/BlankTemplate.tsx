import { Text, View } from "dripsy";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const BlankTemplate: React.FC = () => {
   return (
      <View sx={{}}>
         <Text sx={{}}>Blank Template Component</Text>
         <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Press Me</Text>
         </TouchableOpacity>
      </View>
   );
};

export default BlankTemplate;

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
