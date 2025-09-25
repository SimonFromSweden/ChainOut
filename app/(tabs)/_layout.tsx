import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

// Tab bar icon helper
function TabBarIcon(props: {
   name: React.ComponentProps<typeof FontAwesome>["name"];
   color: string;
}) {
   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
   const navigation = useNavigation();
   const route = useRoute();

   return (
      <Tabs
         screenOptions={{
            headerTitleAlign: "center",
            headerLeft: () =>
               route.name !== "index" ? (
                  <TouchableOpacity
                     onPress={() => navigation.goBack()}
                     style={{ paddingHorizontal: 12 }}>
                     <Ionicons name="arrow-back" size={22} color="black" />
                  </TouchableOpacity>
               ) : null,
         }}>
         <Tabs.Screen
            name="index"
            options={{
               title: "Home",
               tabBarIcon: ({ color }) => (
                  <TabBarIcon name="home" color={color} />
               ),
            }}
         />
         <Tabs.Screen
            name="two"
            options={{
               title: "Second Tab",
               tabBarIcon: ({ color }) => (
                  <TabBarIcon name="star" color={color} />
               ),
            }}
         />
      </Tabs>
   );
}
