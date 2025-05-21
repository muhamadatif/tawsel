import { COLORS } from "@/Constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Category = {
  title: string;
  icon: React.ReactNode;
};

type Props = {
  category: Category;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
};

const CategoryItem = ({
  category,
  activeCategory,
  setActiveCategory,
}: Props) => {
  const active = activeCategory === category.title;
  return (
    <TouchableOpacity
      style={[styles.container, active && { backgroundColor: COLORS.primary }]}
      onPress={() => setActiveCategory(category.title)}
    >
      <View
        style={[
          styles.iconBox,
          active && { backgroundColor: COLORS.secondary },
        ]}
      >
        {category.icon}
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 12 }}>
        {category?.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 40,
    borderRadius: 25,
    padding: 5,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 3,
    shadowOpacity: 0.01,
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
