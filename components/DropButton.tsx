import { COLORS } from "@/Constants/Colors";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const DropButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={{ gap: 3 }} onPress={onPress}>
      <View style={{ width: 15, height: 2, backgroundColor: COLORS.dark }} />
      <View
        style={{
          width: 10,
          height: 2,
          backgroundColor: COLORS.dark,
          alignSelf: "flex-end",
        }}
      />
    </TouchableOpacity>
  );
};

export default DropButton;
