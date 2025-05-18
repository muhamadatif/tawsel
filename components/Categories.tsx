import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CategoryItem from "./CategoryItem";

const categories = [
  {
    title: "Restaurants",
    icon: <Ionicons name="restaurant" size={14} />,
  },
  {
    title: "Grocery",
    icon: <Ionicons name="storefront" size={14} />,
  },

  {
    title: "Mashaweer",
    icon: <Ionicons name="bicycle" size={20} />,
  },
];

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].title);
  return (
    <>
      <Text style={styles.sectionHeader}>What is on your mind? 🤔</Text>
      <ScrollView
        contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => (
          <CategoryItem
            key={category.title}
            category={category}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
    gap: 20,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 20,
  },
  container: {
    gap: 20,
    // marginTop: 20,
    paddingRight: 4,
  },
});

export default Categories;
