import { Text, View } from "dripsy";
import { Link, Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function HomeScreen() {
   return (
      <>
         <Stack.Screen
            options={{ title: "Home", headerTitleAlign: "center" }}
         />
         <View
            sx={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
               bg: "$background",
            }}>
            <Text
               sx={{
                  fontSize: 36,
                  fontWeight: "bold",
                  color: "$white",
               }}>
               ChainOut
            </Text>
            <Text sx={{ fontSize: 16, color: "white", mt: 12 }}>
               Welcome to the Club
            </Text>
            <Link href="/register" asChild>
               <View
                  sx={{
                     bg: "$lightGreen",
                     p: 16,
                     borderRadius: 8,
                     mt: 20,
                     width: 200,
                     alignItems: "center",
                  }}>
                  <Text sx={{ color: "white" }}>Register</Text>
               </View>
            </Link>
            <Link href="/profile" asChild>
               <View
                  sx={{
                     bg: "$mediumGreen",
                     p: 16,
                     borderRadius: 8,
                     mt: 20,
                     width: 200,
                     alignItems: "center",
                  }}>
                  <Text sx={{ color: "white" }}>Log In</Text>
               </View>
            </Link>
            <TouchableOpacity
               onPress={() => router.push("/register")}
               style={{
                  backgroundColor: "#0070f3",
                  padding: 12,
                  borderRadius: 8,
               }}>
               <Text style={{ color: "white" }}>Go to Details</Text>
            </TouchableOpacity>
         </View>
      </>
   );
}
