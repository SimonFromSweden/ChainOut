import { useColorScheme } from "@/components/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
   DarkTheme,
   DefaultTheme,
   ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DripsyProvider, makeTheme } from "dripsy";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import "react-native-reanimated";

// 🚨 Notifications imports
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const queryClient = new QueryClient();

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
   initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// 👇 Configure notifications for foreground
Notifications.setNotificationHandler({
   handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
   }),
});

export default function RootLayout() {
   const [loaded, error] = useFonts({
      SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
      ...FontAwesome.font,
   });

   // 🔔 Push notification state
   const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
   const notificationListener = useRef<Notifications.Subscription | null>(null);
   const responseListener = useRef<Notifications.Subscription | null>(null);

   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
   useEffect(() => {
      if (error) throw error;
   }, [error]);

   useEffect(() => {
      if (loaded) {
         SplashScreen.hideAsync();
      }
   }, [loaded]);

   // Register notifications
   useEffect(() => {
      registerForPushNotificationsAsync().then((token) =>
         setExpoPushToken(token)
      );

      // Listen for incoming notifications
      let notificationSubscription =
         Notifications.addNotificationReceivedListener((notification) => {
            console.log("📩 Notification received:", notification);
         });

      // Listen for user interaction
      let responseSubscription =
         Notifications.addNotificationResponseReceivedListener((response) => {
            console.log("👉 Notification tapped:", response);
         });

      return () => {
         notificationSubscription.remove();
         responseSubscription.remove();
      };
   }, []);

   if (!loaded) {
      return null;
   }

   return (
      <QueryClientProvider client={queryClient}>
         <DripsyProvider theme={theme}>
            <RootLayoutNav />
         </DripsyProvider>
      </QueryClientProvider>
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
               // 👇 only show back button if NOT on tabs home
               headerLeft: () =>
                  isHome ? null : (
                     <TouchableOpacity
                        onPress={() => router.back()}
                        style={{ paddingHorizontal: 12 }}
                        accessibilityLabel="Back">
                        <Ionicons name="arrow-back" size={22} color="black" />
                     </TouchableOpacity>
                  ),
            }}>
            {/* Tabs group (Home, Play, Profile as bottom tabs) */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Other screens outside tabs */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ title: "Register" }} />
            <Stack.Screen name="login" options={{ title: "Login" }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
         </Stack>
      </ThemeProvider>
   );
}

async function registerForPushNotificationsAsync() {
   let token;

   if (Device.isDevice) {
      const { status: existingStatus } =
         await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
         const { status } = await Notifications.requestPermissionsAsync();
         finalStatus = status;
      }

      if (finalStatus !== "granted") {
         alert("Failed to get push token!");
         return;
      }

      try {
         // 👇 In Expo Go, projectId may not exist → wrap it in a try/catch
         const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ??
            Constants?.easConfig?.projectId;

         if (projectId) {
            token = (await Notifications.getExpoPushTokenAsync({ projectId }))
               .data;
         } else {
            console.log(
               "⚠️ No projectId found (probably Expo Go). Skipping push token."
            );
         }
      } catch (e) {
         console.log("⚠️ Could not fetch push token in Expo Go:", e);
      }
   } else {
      alert("Must use physical device for Push Notifications");
   }

   if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
         name: "default",
         importance: Notifications.AndroidImportance.MAX,
         vibrationPattern: [0, 250, 250, 250],
         lightColor: "#FF231F7C",
      });
   }

   return token;
}
