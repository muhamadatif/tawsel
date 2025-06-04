import { COLORS } from "@/Constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

const ArrowBack = () => {
  return (
    <View style={styles.wrapper}>
      <Ionicons name="chevron-back" size={25} color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
  },
});

export default ArrowBack;
