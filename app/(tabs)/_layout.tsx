import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
   return (
      <Tabs
         screenOptions={{
            headerTitleAlign: "center",
            tabBarActiveTintColor: "#17cf17", // active color
            headerStyle: {
               backgroundColor: "#102111", // custom background
               borderBottomWidth: 0, // remove border
            },
            tabBarStyle: {
               backgroundColor: "#134311", // bottom tab bar background
               borderTopWidth: 0, // removes top border line
            },
            headerTintColor: "white", // text & back button color
         }}>
         <Tabs.Screen
            name="index"
            options={{
               title: "Profile",
               tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person" size={size} color={color} />
               ),
            }}
         />

         <Tabs.Screen
            name="coursesTab"
            options={{
               title: "Courses",
               tabBarIcon: ({ color, size }) => (
                  <Ionicons name="map-outline" size={size} color={color} />
               ),
            }}
         />

         <Tabs.Screen
            name="badgesTab"
            options={{
               title: "Badges",
               tabBarIcon: ({ color, size }) => (
                  <Ionicons name="ribbon-outline" size={size} color={color} />
               ),
            }}
         />

         <Tabs.Screen
            name="settingsTab"
            options={{
               title: "Settings",
               tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings-outline" size={size} color={color} />
               ),
            }}
         />
      </Tabs>
   );
}
