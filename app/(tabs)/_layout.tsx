import { Ionicons } from "@expo/vector-icons";
import { Tabs, useNavigation, usePathname, useRouter } from "expo-router";
import { LogBox, TouchableOpacity } from "react-native";

// Ignore SafeAreaView deprecation warning in dev
LogBox.ignoreLogs([
   "SafeAreaView has been deprecated and will be removed in a future release.",
]);

export default function TabLayout() {
   const navigation = useNavigation();
   const pathname = usePathname();
   const router = useRouter();

   const isHome = pathname === "/(tabs)";

   return (
      <Tabs
         screenOptions={{
            headerShown: true, // hide headers for all root tabs
            headerTitleAlign: "center",
            tabBarActiveTintColor: "#17cf17",
            headerStyle: { backgroundColor: "#102111", borderBottomWidth: 0 },
            headerTintColor: "white",
            tabBarStyle: { backgroundColor: "#134311", borderTopWidth: 0 },
            // headerRight: () => (
            //    <TouchableOpacity
            //       // navigate to root index.tsx
            //       onPress={() => router.replace("../")}
            //       style={{ paddingHorizontal: 12 }}>
            //       <Ionicons name="log-out-outline" size={22} color="white" />
            //    </TouchableOpacity>
            // ),
         }}>
         {/*
         Define the tab screens with icons and titles.
         The names should match the file names in the (tabs) directory.
         */}
         <Tabs.Screen
            name="index"
            options={{
               title: "Profile",
               tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person" size={size} color={color} />
               ),
               headerRight: () => (
                  <TouchableOpacity
                     // navigate to root index.tsx
                     onPress={() => router.replace("/(onboarding)")}
                     style={{ paddingHorizontal: 12 }}>
                     <Ionicons name="log-out-outline" size={22} color="white" />
                  </TouchableOpacity>
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
               headerRight: () => (
                  <TouchableOpacity
                     // navigate to root index.tsx
                     onPress={() => router.replace("/(onboarding)")}
                     style={{ paddingHorizontal: 12 }}>
                     <Ionicons name="log-out-outline" size={22} color="white" />
                  </TouchableOpacity>
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
               headerRight: () => (
                  <TouchableOpacity
                     // navigate to root index.tsx
                     onPress={() => router.replace("/(onboarding)")}
                     style={{ paddingHorizontal: 12 }}>
                     <Ionicons name="log-out-outline" size={22} color="white" />
                  </TouchableOpacity>
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
               headerRight: () => (
                  <TouchableOpacity
                     // navigate to root index.tsx
                     onPress={() => router.replace("/(onboarding)")}
                     style={{ paddingHorizontal: 12 }}>
                     <Ionicons name="log-out-outline" size={22} color="white" />
                  </TouchableOpacity>
               ),
            }}
         />
      </Tabs>
   );
}
