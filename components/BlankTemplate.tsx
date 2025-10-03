import { Text, View } from "dripsy";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type BlankTemplateProps = {
   children?: React.ReactNode;
};

const BlankTemplate = ({ children }: BlankTemplateProps) => {
   return (
      <View sx={{}}>
         <Text sx={{}}>Blank Template Component</Text>
         <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Press Me</Text>
         </TouchableOpacity>

         {/* render children if passed in */}
         {children}
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
