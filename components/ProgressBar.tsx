import { View } from "dripsy";
import React from "react";

type ProgressBarProps = {
   progress: number; // value between 0 and 1
};

export default function ProgressBar({ progress }: ProgressBarProps) {
   return (
      <View
         sx={{
            height: 12,
            width: "100%",
            backgroundColor: "$barGray", // background
            borderRadius: 6,
            overflow: "hidden",
         }}>
         <View
            sx={{
               height: "100%",
               width: `${Math.min(Math.max(progress, 0), 1) * 100}%`,
               backgroundColor: "#17cf17", // progress color
            }}
         />
      </View>
   );
}
