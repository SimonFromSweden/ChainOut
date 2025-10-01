import { Text, View } from "dripsy";
import React from "react";

type StatCardProps = {
   title?: string;
   children?: React.ReactNode;
};

export const OverView: React.FC<StatCardProps> = () => {
   return (
      <View sx={{ display: "flex", flexDirection: "col", mt: 12 }}>
         <View
            sx={{
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-between",
            }}>
            <View sx={{}}>
               <Text sx={styles.heading}>Rounds Played</Text>
               <View sx={styles.card}>
                  <Text sx={styles.heading}>Total</Text>
                  <View sx={{}}></View>
               </View>
            </View>
            <View sx={{}}>
               <Text sx={styles.heading}>Verified Rounds</Text>
               <View sx={styles.card}>
                  <Text sx={{}}></Text>
                  <View sx={{}}></View>
               </View>
            </View>
         </View>
         <View
            sx={{
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-between",
            }}>
            <View sx={{}}>
               <Text sx={styles.heading}>Badges Earned</Text>
               <View sx={styles.card}>
                  <Text sx={{}}></Text>
                  <View sx={{}}></View>
               </View>
            </View>
            <View sx={{}}>
               <Text sx={styles.heading}>Longest Streak</Text>
               <View sx={styles.card}>
                  <Text sx={{}}></Text>
                  <View sx={{}}></View>
               </View>
            </View>
         </View>
      </View>
   );
};

export default OverView;

const styles = {
   card: {
      backgroundColor: "$barGray",
      borderRadius: 22,
      width: 160,
      height: 90,
      px: 3,
      py: 2,
      ml: 1,
   },
   heading: {
      fontSize: 18,
      color: "$white",
      fontFamily: "NunitoBold",
      mt: 6,
   },
};
