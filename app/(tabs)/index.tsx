import ProfileImage from "@/assets/icons/profile-icon.jpg";
import ProfileBackgroundImage from "@/assets/images/tabs-background.png";
import OverView from "@/components/ProfileScreen/OverView";
import ProgressBar from "@/components/ProgressBar";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Image, Text, View } from "dripsy";
import { useState } from "react";
import { ImageBackground } from "react-native";

export default function ProfileScreen() {
   const [activeTab, setActiveTab] = useState(1);

   return (
      <>
         <ImageBackground
            source={ProfileBackgroundImage}
            blurRadius={8}
            style={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
            }}>
            <View
               sx={{
                  flex: 1,
                  width: "100%",
                  justifyContent: "start",
                  alignItems: "center",
                  bg: "$backgroundGreen",
                  opacity: 0.7,
               }}>
               <Image
                  source={ProfileImage}
                  sx={{
                     width: 120,
                     height: 120,
                     borderRadius: 60,
                     borderColor: "$dullGreen",
                     borderWidth: 4,
                     mt: 40,
                  }}></Image>
               <Text
                  sx={{
                     fontSize: 22,
                     color: "$white",
                     fontFamily: "NunitoBold",
                     mt: 6,
                  }}>
                  Username123
               </Text>
               <View
                  sx={{
                     backgroundColor: "$darkGreen",
                     borderRadius: 16,
                     py: 5,
                     px: 10,
                     mt: 4,
                  }}>
                  <Text sx={{ color: "$clearGreen", fontFamily: "NunitoBold" }}>
                     Level 12
                  </Text>
               </View>
               <View sx={{ width: "90%" }}>
                  <View sx={{ mt: 16 }}>
                     <View
                        sx={{
                           display: "flex",
                           flexDirection: "row",
                           justifyContent: "space-between",
                           mb: 6,
                        }}>
                        <Text
                           sx={{
                              color: "white",
                              fontFamily: "NunitoBold",
                              fontSize: 15,
                              ml: 1,
                           }}>
                           Next Level
                        </Text>
                        <Text
                           sx={{
                              color: "white",
                              fontFamily: "NunitoBold",
                              fontSize: 15,
                              ml: 1,
                           }}>
                           45/100 XP
                        </Text>
                     </View>
                     <ProgressBar progress={0.4}></ProgressBar>
                  </View>
                  <View sx={{ mt: 32 }}>
                     <View
                        sx={{
                           display: "flex",
                           flexDirection: "row",
                           justifyContent: "space-evenly",
                           gap: 12,
                        }}>
                        <View sx={{ alignItems: "center" }}>
                           <Text
                              sx={styles.tabText(activeTab === 1)}
                              onPress={() => setActiveTab(1)}>
                              Overview
                           </Text>
                           {activeTab === 1 && (
                              <View
                                 sx={{
                                    height: 4, // thickness of underline
                                    width: 50, // fixed width (shorter than text)
                                    backgroundColor: "$lightGreen",
                                    borderRadius: 2, // rounded edges
                                    marginTop: 6, // space below text
                                 }}
                              />
                           )}
                        </View>
                        <View sx={{ alignItems: "center" }}>
                           <Text
                              sx={styles.tabText(activeTab === 2)}
                              onPress={() => setActiveTab(2)}>
                              Stats
                           </Text>
                           {activeTab === 2 && (
                              <View
                                 sx={{
                                    height: 4, // thickness of underline
                                    width: 50, // fixed width (shorter than text)
                                    backgroundColor: "$lightGreen",
                                    borderRadius: 2, // rounded edges
                                    marginTop: 6, // space below text
                                 }}
                              />
                           )}
                        </View>
                        <View sx={{ alignItems: "center" }}>
                           <Text
                              sx={styles.tabText(activeTab === 3)}
                              onPress={() => setActiveTab(3)}>
                              Friends
                           </Text>
                           {activeTab === 3 && (
                              <View
                                 sx={{
                                    height: 4, // thickness of underline
                                    width: 50, // fixed width (shorter than text)
                                    backgroundColor: "$lightGreen",
                                    borderRadius: 2, // rounded edges
                                    marginTop: 6, // space below text
                                 }}
                              />
                           )}
                        </View>
                     </View>
                  </View>
                  <OverView></OverView>
               </View>
            </View>
         </ImageBackground>
      </>
   );
}

const styles = {
   tabText: (isActive: boolean) => ({
      fontFamily: "NunitoBold",
      fontSize: 15,
      color: isActive ? "$lightGreen" : "white",
   }),
};

export const options: BottomTabNavigationOptions = {
   title: "Profile",
   tabBarIcon: ({ color, size }) => (
      <Ionicons name="person" size={size} color={color} />
   ),
};
