import { Text, View } from "dripsy";

export default function CoursesScreen() {
   return (
      <>
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
               Courses
            </Text>
         </View>
      </>
   );
}
