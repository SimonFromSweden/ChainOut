import { useColorScheme } from "@/components/useColorScheme";
import { theme } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
   DarkTheme,
   DefaultTheme,
   ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DripsyProvider } from "dripsy";
import { useFonts } from "expo-font";
import { Stack, useNavigation, usePathname, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import {
   ActivityIndicator,
   LogBox,
   TouchableOpacity,
   View,
} from "react-native";
import "react-native-reanimated";

import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";

// 🚨 Notifications imports
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
const queryClient = new QueryClient();

// Ignore SafeAreaView deprecation warning in dev
LogBox.ignoreLogs([
   "SafeAreaView has been deprecated and will be removed in a future release.",
]);

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
   const [loading, setLoading] = useState(true);
   const [hasOnboarded, setHasOnboarded] = useState(false);
   const router = useRouter();
   useEffect(() => {
      const checkOnboarding = async () => {
         try {
            const value = await AsyncStorage.getItem("hasOnboarded");
            setHasOnboarded(value === "true");
         } catch (e) {
            console.log("Error checking onboarding:", e);
         } finally {
            setLoading(false);
         }
      };

      checkOnboarding();
   }, []);

   useEffect(() => {
      if (!loading) {
         if (hasOnboarded) {
            router.replace("/(onboarding)"); // Go to index of onboarding where they can choose register or login
         } else {
            router.replace("/(onboarding)/page1"); // Start onboarding
         }
      }
   }, [loading, hasOnboarded]);

   const [loaded, error] = useFonts({
      SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
      Nunito: Nunito_400Regular,
      NunitoBold: Nunito_700Bold,
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

   // 🔔 Push notification state
   const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
   const notificationListener = useRef<Notifications.Subscription | null>(null);
   const responseListener = useRef<Notifications.Subscription | null>(null);

   useEffect(() => {
      let mounted = true;

      (async () => {
         const token = await registerForPushNotificationsAsync();
         if (mounted) {
            setExpoPushToken(token);
         }
      })();
      // Subscribe to notifications
      notificationListener.current =
         Notifications.addNotificationReceivedListener((notification) => {
            console.log("📩 Notification received:", notification);
         });

      responseListener.current =
         Notifications.addNotificationResponseReceivedListener((response) => {
            console.log("👉 Notification tapped:", response);
         });

      // ✅ Cleanup on unmount
      return () => {
         notificationListener.current?.remove();
         responseListener.current?.remove();
      };
   }, []);

   if (!loaded || loading) {
      return (
         <View
            style={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
               backgroundColor: "#102111",
            }}>
            <ActivityIndicator size="large" color="#17cf17" />
         </View>
      );
   }

   return (
      <QueryClientProvider client={queryClient}>
         <DripsyProvider theme={theme as any}>
            <RootLayoutNav />
         </DripsyProvider>
      </QueryClientProvider>
   );
}

function RootLayoutNav() {
   const pathname = usePathname(); // gives current route
   const router = useRouter();
   const navigation = useNavigation();
   const colorScheme = useColorScheme();

   const isHome = pathname === "/(tabs)";

   return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
         <Stack
            screenOptions={{
               headerTitleAlign: "center",
               headerShown: false,
               headerStyle: {
                  backgroundColor: "$darkGreen",
               },
               headerLeft: () => {
                  // Hide back button on home or if there's nowhere to go back
                  if (isHome || !navigation.canGoBack()) return null;

                  return (
                     <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ paddingHorizontal: 12 }}
                        accessibilityLabel="Back">
                        <Ionicons name="arrow-back" size={22} color="white" />
                     </TouchableOpacity>
                  );
               },
            }}>
            {/* Root index screen first */}
            <Stack.Screen name="index" options={{ headerShown: false }} />

            {/* Tabs group (Profile, Courses, Badges, Settings as bottom tabs) */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Other screens outside tabs */}

            <Stack.Screen
               name="(auth)/register"
               options={{ title: "Register" }}
            />
            <Stack.Screen name="(auth)/login" options={{ title: "Login" }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
         </Stack>
      </ThemeProvider>
   );
}

let warnedEmulator = false;

export async function registerForPushNotificationsAsync() {
   let token: string | null = null;

   // ✅ Skip push registration if running on emulator/simulator
   if (!Device.isDevice) {
      if (!warnedEmulator && __DEV__) {
         console.log(
            "⚠️ Push notifications are disabled on emulators/simulators."
         );
         warnedEmulator = true;
      }
      return null;
   }

   // 🔑 Request notification permissions
   const { status: existingStatus } = await Notifications.getPermissionsAsync();
   let finalStatus = existingStatus;

   if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
   }

   if (finalStatus !== "granted") {
      console.warn("⚠️ Failed to get push notification permissions.");
      return null;
   }

   // 📱 Try to fetch Expo push token
   try {
      const projectId =
         Constants?.expoConfig?.extra?.eas?.projectId ??
         Constants?.easConfig?.projectId;

      if (projectId) {
         token = (await Notifications.getExpoPushTokenAsync({ projectId }))
            .data;
         console.log("✅ Expo push token:", token);
      } else {
         console.log("⚠️ No projectId found (probably running in Expo Go)");
      }
   } catch (e) {
      console.log("⚠️ Could not fetch push token:", e);
   }

   // ⚡ Android channel setup
   if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
         name: "default",
         importance: Notifications.AndroidImportance.MAX,
         vibrationPattern: [0, 250, 250, 250],
         lightColor: "#FF231F7C",
      });
   }

   return token;
}
