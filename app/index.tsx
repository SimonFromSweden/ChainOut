import { Image, Text, View } from "dripsy";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";

export default function OnboardingScreen() {
   const router = useRouter();
   return (
      <View
         sx={{
            flex: 1,
            justifyContent: "start",
            alignItems: "center",
            backgroundColor: "#102111",
         }}>
         <View sx={{ width: "100%", height: 340, paddingHorizontal: 2 }}>
            <Image
               source={require("../assets/images/dg-onboarding.png")}
               style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 8,
                  overflow: "hidden", // keeps rounded corners
               }}
            />
            {/* Gradient overlay */}
            <LinearGradient
               colors={["transparent", "#102111"]} // fade into background color
               style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 120, // how tall the fade is
               }}
            />
         </View>

         <Text
            style={{
               fontSize: 46,
               fontWeight: "bold",
               color: "white",
               position: "relative",
               bottom: 90,
            }}>
            ChainOut
         </Text>
         <View
            sx={{
               position: "relative",
               bottom: 30,
               width: "90%",
               alignItems: "center",
            }}>
            <Text style={{ fontSize: 32, color: "white" }}>
               Welcome to the Club
            </Text>
            <Text
               style={{
                  fontSize: 16,
                  color: "gray",
                  paddingHorizontal: 32,
                  textAlign: "center",
                  marginTop: 8,
               }}>
               Track your discgolf rounds, compete with friends, and earn
               rewards.
            </Text>

            <Link href="/register" asChild>
               <View
                  style={{
                     backgroundColor: "#17cf17",
                     padding: 16,
                     borderRadius: 8,
                     marginTop: 20,
                     width: "80%",
                     alignItems: "center",
                  }}
                  onTouchEnd={() => router.replace("/register")}>
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
                     width: "80%",
                     alignItems: "center",
                  }}
                  onTouchEnd={() => router.replace("/(tabs)")}>
                  <Text style={{ color: "white" }}>Log In</Text>
               </View>
            </Link>
         </View>
         <View
            sx={{
               position: "absolute",
               bottom: 50,
               px: 80,
            }}>
            <Text
               sx={{
                  color: "white",
                  fontSize: 12,
                  textAlign: "center",
               }}>
               By continuing, you agree to our{" "}
               <Text sx={{ fontWeight: "bold", color: "white", fontSize: 12 }}>
                  Terms of Service
               </Text>{" "}
               and{" "}
               <Text sx={{ fontWeight: "bold", color: "white", fontSize: 12 }}>
                  Privacy Policy
               </Text>
            </Text>
         </View>
      </View>
   );
}
