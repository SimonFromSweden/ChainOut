import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { LogBox, TouchableOpacity } from "react-native";
import { options as badgesOptions } from "./badges";
import { options as coursesOptions } from "./courses";
import { options as indexOptions } from "./index";
import { options as leaderboardsOptions } from "./leaderboards2";
import { options as settingsOptions } from "./settings";

// Ignore SafeAreaView deprecation warning in dev
LogBox.ignoreLogs([
   "SafeAreaView has been deprecated and will be removed in a future release.",
]);

export default function TabLayout() {
   const { logout } = useAuth();

   return (
      <Tabs
         screenOptions={{
            headerShown: true,
            headerTitleAlign: "center",
            tabBarActiveTintColor: "#17cf17",
            headerStyle: { backgroundColor: "#102111", borderBottomWidth: 0 },
            headerTintColor: "white",
            tabBarStyle: { backgroundColor: "#134311", borderTopWidth: 0 },
            headerRight: () => (
               <TouchableOpacity
                  onPress={logout}
                  style={{ paddingHorizontal: 12 }}>
                  <Ionicons name="log-out-outline" size={22} color="white" />
               </TouchableOpacity>
            ),
         }}>
         <Tabs.Screen name="index" options={indexOptions} />
         <Tabs.Screen name="courses" options={coursesOptions} />
         <Tabs.Screen name="badges" options={badgesOptions} />
         {/* Windows + Git case-sensitivity mismatch for leaderboards, fix later */}
         <Tabs.Screen name="leaderboards2" options={leaderboardsOptions} />
         <Tabs.Screen name="settings" options={settingsOptions} />
      </Tabs>
   );
}
