import { COLORS } from "@/Constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  location?: string;
  onPress: () => void;
};

const SearchButton = ({ location, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.location}>
        {location ? location : "Detect your location"}
      </Text>
      <View style={styles.iconBox}>
        <Ionicons name="search" size={18} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.grayLight,
    paddingLeft: 12,
    borderRadius: 5,
    height: 44,
  },
  location: {},
  iconBox: {
    backgroundColor: COLORS.primary,
    height: 44,
    width: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SearchButton;
