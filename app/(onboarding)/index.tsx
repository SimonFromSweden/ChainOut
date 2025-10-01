import OnboardingImage from "@/assets/images/dg-onboarding.png";
import PrimaryButton from "@/components/PrimaryButton";
import { setHasOnboarded } from "@/utils/onboarding";
import { Image, Text, View } from "dripsy";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
   const router = useRouter();

   const handleOnboarded = async () => {
      await setHasOnboarded();
   };

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
               source={OnboardingImage}
               style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 8,
                  overflow: "hidden",
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

            <PrimaryButton
               title="Register"
               onPress={async () => {
                  handleOnboarded();
                  router.push("/(auth)/register");
               }}
            />

            <PrimaryButton
               title="Log In"
               onPress={async () => {
                  handleOnboarded();
                  router.push("/(auth)/login");
               }}
               backgroundColor="#134311"
            />

            <PrimaryButton
               title="Cheat your way in"
               onPress={async () => {
                  router.replace("/(tabs)");
               }}
               backgroundColor="$forestGreen"
            />
            <PrimaryButton
               title="Onboarding - Page 1"
               onPress={async () => {
                  router.replace("/(onboarding)/page1");
               }}
               backgroundColor="$lightGray"
            />
            {/* <PrimaryButton
               title="Onboarding - Page 2"
               onPress={async () => {
                  router.replace("/(onboarding)/page2");
               }}
               backgroundColor="$iconYellow"
            />  */}
         </View>
         <View
            sx={{
               position: "absolute",
               bottom: 40,
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
