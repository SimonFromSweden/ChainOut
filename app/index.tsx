import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function OnboardingScreen() {
   return (
      <View
         style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#102111",
         }}>
         <Text style={{ fontSize: 36, fontWeight: "bold", color: "white" }}>
            ChainOut
         </Text>
         <Text style={{ fontSize: 16, color: "white", marginTop: 12 }}>
            Welcome to the Club
         </Text>

         <Link href="/register" asChild>
            <View
               style={{
                  backgroundColor: "#17cf17",
                  padding: 16,
                  borderRadius: 8,
                  marginTop: 20,
                  width: 200,
                  alignItems: "center",
               }}>
               <Text style={{ color: "white" }}>Register</Text>
            </View>
         </Link>

         <Link href="/(tabs)" asChild>
            <View
               style={{
                  backgroundColor: "#134311",
                  padding: 16,
                  borderRadius: 8,
                  marginTop: 20,
                  width: 200,
                  alignItems: "center",
               }}>
               <Text style={{ color: "white" }}>Log In</Text>
            </View>
         </Link>
      </View>
   );
}
