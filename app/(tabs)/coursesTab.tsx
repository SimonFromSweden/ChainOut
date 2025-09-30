import MapScreen from "@/components/MapScreen";
import { View } from "dripsy";

export default function CoursesScreen() {
   return (
      <>
         <View
            sx={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
               bg: "$darkGreen",
            }}>
            <View sx={{ flex: 1, width: "100%" }}>
               <MapScreen />
            </View>
         </View>
      </>
   );
}
