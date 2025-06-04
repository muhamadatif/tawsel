import { COLORS } from "@/Constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  id: string;
  name: string;
  width?: number;
  icon?: React.ReactNode;
  activeCategory: string;
  setActiveCategory: any;
  onLayout?: (category: any) => void;
};

const CategoryItem = ({
  id,
  name,
  icon,
  width = 130,
  activeCategory,
  setActiveCategory,
  onLayout,
}: Props) => {
  const active = activeCategory === id;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { width: width },
        active && { backgroundColor: COLORS.primary },
      ]}
      onPress={() => setActiveCategory(id)}
      onLayout={onLayout}
    >
      {icon && (
        <View
          style={[
            styles.iconBox,
            active && { backgroundColor: COLORS.secondary },
          ]}
        >
          {icon}
        </View>
      )}
      <Text style={{ fontWeight: "bold", fontSize: 12 }}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 25,
    padding: 5,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    gap: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 3,
    shadowOpacity: 0.09,
    elevation: 3,
  },
  iconBox: {
    backgroundColor: COLORS.grayLight,
    width: 34,
    height: 34,
    padding: 3,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryItem;
