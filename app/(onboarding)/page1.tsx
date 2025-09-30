import PrimaryButton from "@/components/PrimaryButton";
import { Image, Text, View } from "dripsy";
import { useRouter } from "expo-router";

export default function OnboardingPage1() {
   const router = useRouter();

   return (
      <View
         sx={{
            flex: 1,
            justifyContent: "start",
            alignItems: "center",
            backgroundColor: "#102111",
         }}>
         <Text
            sx={{
               fontSize: 32,
               fontFamily: "NunitoBold",
               color: "white",
               textAlign: "center",
               marginTop: 80,
            }}>
            Welcome to ChainOut
         </Text>
         <Text
            sx={{
               fontSize: 15,
               marginTop: 12,
               color: "$lightGray",
               paddingHorizontal: 32,
               textAlign: "center",
            }}>
            Your ultimate discgolf companion. Track your scores, unlock
            achievements, earn badges and compete with friends in a game within
            the game - ChainOut.
         </Text>
         <View sx={{ width: "100%", paddingHorizontal: 16, marginTop: 24 }}>
            <Image
               source={require("@/assets/images/dg-onboarding3.png")}
               sx={{
                  width: "100%",
                  aspectRatio: 0.66,
                  borderRadius: 20,
               }}></Image>
         </View>
         <PrimaryButton
            title="Get Started"
            textColor="$black"
            onPress={async () => {
               router.push("/(onboarding)/page2");
            }}
         />
      </View>
   );
}
