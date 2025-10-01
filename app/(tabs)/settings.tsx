import ProfileBackgroundImage from "@/assets/images/tabs-background2-min.png";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Text, View } from "dripsy";
import { ImageBackground } from "react-native";

export default function SettingsScreen() {
   return (
      <>
         <ImageBackground
            source={ProfileBackgroundImage}
            blurRadius={8}
            style={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
            }}>
            <View
               sx={{
                  flex: 1,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  bg: "$darkGreen",
                  opacity: 0.7,
               }}>
               <Text
                  sx={{
                     fontSize: 36,
                     fontWeight: "bold",
                     color: "$white",
                  }}>
                  Settings
               </Text>
            </View>
         </ImageBackground>
      </>
   );
}

export const options: BottomTabNavigationOptions = {
   title: "Settings",
   tabBarIcon: ({ color, size }) => (
      <Ionicons name="settings-outline" size={size} color={color} />
   ),
};
