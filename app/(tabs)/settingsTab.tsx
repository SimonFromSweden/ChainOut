import ProfileBackgroundImage from "@/assets/images/tabs-background2-min.png";
import { Text, View } from "dripsy";
import { ImageBackground } from "react-native";

export default function HomeScreen() {
   return (
      <>
         <ImageBackground
            source={ProfileBackgroundImage}
            blurRadius={3}
            style={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
            }}>
            <View
               sx={{
                  flex: 1,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  bg: "$darkGreen",
                  opacity: 0.7,
               }}>
               <Text
                  sx={{
                     fontSize: 36,
                     fontWeight: "bold",
                     color: "$white",
                  }}>
                  Profile
               </Text>
            </View>
         </ImageBackground>
      </>
   );
}
