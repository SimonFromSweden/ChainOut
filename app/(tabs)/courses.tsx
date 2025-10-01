import MapScreen from "@/components/MapScreen";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { View } from "dripsy";

export default function CoursesScreen() {
   return (
      <>
         <View
            sx={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
               bg: "$darkGreen",
            }}>
            <View sx={{ flex: 1, width: "100%" }}>
               <MapScreen />
            </View>
         </View>
      </>
   );
}

export const options: BottomTabNavigationOptions = {
   title: "Courses",
   tabBarIcon: ({ color, size }) => (
      <Ionicons name="map-outline" size={size} color={color} />
   ),
};
