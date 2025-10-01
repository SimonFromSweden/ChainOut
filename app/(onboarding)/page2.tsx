import OnboardingImage from "@/assets/images/dg-onboarding2.png";
import PrimaryButton from "@/components/PrimaryButton";
import { Image, Text, View } from "dripsy";
import { LinearGradient } from "expo-linear-gradient";
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
         <View sx={{ width: "100%", height: 300, paddingHorizontal: 2 }}>
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
                  height: 140, // how tall the fade is
               }}
            />
            <View
               sx={{
                  alignSelf: "flex-start",
                  paddingHorizontal: 32,
                  position: "absolute",
                  bottom: 32,
               }}>
               <Text
                  sx={{
                     fontSize: 38,
                     fontFamily: "NunitoBold",
                     color: "white",
                     px: 8,
                     textAlign: "start",
                  }}>
                  ChainOut
               </Text>
               <Text
                  sx={{
                     fontSize: 14,
                     color: "$lightGray",
                     px: 8,
                     textAlign: "start",
                  }}>
                  Level up your discgolf game with the ultimate companion app
                  for tracking scores, chasing badges and connecting with
                  friends.
               </Text>
            </View>
         </View>

         <View
            sx={{
               display: "flex",
               flexDirection: "row",
               alignSelf: "flex-start",
               gap: 8,
               paddingHorizontal: 20,
               mt: 16,
            }}>
            <Image
               source={require("@/assets/icons/star-icon-green-30.png")}
               sx={{
                  width: 30,
                  height: 30,
                  position: "relative",
                  top: 5,
               }}></Image>
            <Text
               sx={{ fontSize: 28, color: "$white", fontFamily: "NunitoBold" }}>
               Key Features
            </Text>
         </View>
         <Text
            sx={{
               fontSize: 13,
               color: "gray",
               paddingHorizontal: 24,
               textAlign: "start",
            }}>
            Discover what makes ChainOut the go-to app for discgolfers of all
            skill-levels.
         </Text>
         <View
            sx={{
               display: "flex",
               flexDirection: "col",
               alignSelf: "start",
               gap: 32,
               mt: 28,
               ml: 42,
               mb: 14,
            }}>
            {/* Feature 1 */}
            <View sx={{ display: "flex", flexDirection: "row", gap: 12 }}>
               <Image
                  source={require("@/assets/images/onboarding-icon1.png")}
                  sx={{
                     width: 80,
                     height: 80,
                     position: "relative",
                     top: 4,
                     borderRadius: 7,
                  }}></Image>
               <View
                  sx={{
                     display: "flex",
                     flexDirection: "col",
                  }}>
                  <Text
                     sx={{
                        fontFamily: "NunitoBold",
                        fontSize: 16,
                        color: "$white",
                        mt: 4,
                     }}>
                     Track your scores
                  </Text>
                  <Text
                     sx={{
                        fontSize: 13,
                        color: "gray",
                        textAlign: "start",
                        maxWidth: 190,
                        mt: 4,
                     }}>
                     Easily record scores, track your achievements and earn
                     badges in a game within the game!
                  </Text>
               </View>
            </View>

            {/* Feature 2 */}
            <View sx={{ display: "flex", flexDirection: "row", gap: 12 }}>
               <Image
                  source={require("@/assets/images/onboarding-icon2.png")}
                  sx={{
                     width: 80,
                     height: 80,
                     position: "relative",
                     top: 4,
                     borderRadius: 7,
                  }}></Image>
               <View
                  sx={{
                     display: "flex",
                     flexDirection: "col",
                  }}>
                  <Text
                     sx={{
                        fontFamily: "NunitoBold",
                        fontSize: 16,
                        color: "$white",
                        mt: 4,
                     }}>
                     Explore Courses
                  </Text>
                  <Text
                     sx={{
                        fontSize: 13,
                        color: "gray",
                        textAlign: "start",
                        maxWidth: 190,
                        mt: 4,
                     }}>
                     Discover new courses, view detailed maps, and get real-time
                     course conditions.
                  </Text>
               </View>
            </View>

            {/* Feature 3 */}
            <View sx={{ display: "flex", flexDirection: "row", gap: 12 }}>
               <Image
                  source={require("@/assets/images/onboarding-icon3.png")}
                  sx={{
                     width: 80,
                     height: 80,
                     position: "relative",
                     top: 4,
                     borderRadius: 7,
                  }}></Image>
               <View
                  sx={{
                     display: "flex",
                     flexDirection: "col",
                  }}>
                  <Text
                     sx={{
                        fontFamily: "NunitoBold",
                        fontSize: 16,
                        color: "$white",
                        mt: 4,
                     }}>
                     Connect with Players
                  </Text>
                  <Text
                     sx={{
                        fontSize: 13,
                        color: "gray",
                        textAlign: "start",
                        maxWidth: 190,
                        mt: 4,
                     }}>
                     Join a vibrant community and challenge friends to friendly
                     badge-collecting competitions.
                  </Text>
               </View>
            </View>
         </View>
         <PrimaryButton
            title="Get Started"
            textColor="$black"
            onPress={async () => {
               router.push("/(onboarding)");
            }}
         />
      </View>
   );
}
