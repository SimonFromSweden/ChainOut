import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
   DarkTheme,
   DefaultTheme,
   ThemeProvider,
} from "@react-navigation/native";
import { DripsyProvider, makeTheme } from "dripsy";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";

const theme = makeTheme({
   colors: {
      $primary: "#0070f3",
      $background: "#102111",
      $text: "#000",
      $white: "#fff",
      $lightGreen: "#17cf17",
      $mediumGreen: "#134311",
   },
   text: {
      body: {
         fontSize: 16,
         color: "$text",
      },
      heading: {
         fontSize: 24,
         fontWeight: "bold",
         color: "$primary",
      },
   },
});

export {
   // Catch any errors thrown by the Layout component.
   ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
   // Ensure that reloading on `/modal` keeps a back button present.
   initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
   const [loaded, error] = useFonts({
      SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
      ...FontAwesome.font,
   });

   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
   useEffect(() => {
      if (error) throw error;
   }, [error]);

   useEffect(() => {
      if (loaded) {
         SplashScreen.hideAsync();
      }
   }, [loaded]);

   if (!loaded) {
      return null;
   }

   return (
      <DripsyProvider theme={theme}>
         <RootLayoutNav />
      </DripsyProvider>
   );
}

function RootLayoutNav() {
   const pathname = usePathname(); // gives current route
   const router = useRouter();
   const colorScheme = useColorScheme();

   const isHome = pathname === "/(tabs)" || pathname === "/(tabs)/index";

   return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
         <Stack
            screenOptions={{
               headerTitleAlign: "center",
               // render a simple native touchable with an icon for the back button
               headerLeft: () => (
                  <TouchableOpacity
                     onPress={() => router.back()}
                     style={{ paddingHorizontal: 12 }}
                     accessibilityLabel="Back">
                     <Ionicons name="arrow-back" size={22} color="black" />
                  </TouchableOpacity>
               ),
            }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
         </Stack>
      </ThemeProvider>
   );
}
