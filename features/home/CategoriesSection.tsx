import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import CategoryItem from "../../components/CategoryItem";

const categories = [
  {
    id: "cat-1",
    name: "Restaurants",
    icon: <Ionicons name="restaurant" size={14} />,
  },
  {
    id: "cat-2",

    name: "Grocery",
    icon: <Ionicons name="storefront" size={14} />,
  },

  {
    id: "cat-3",

    name: "Mashaweer",
    icon: <Ionicons name="bicycle" size={20} />,
  },
];

const CategoriesSection = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>What is on your mind? 🤔</Text>
      <ScrollView
        contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            id={category.id}
            name={category.name}
            icon={category.icon}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    gap: 20,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 20,
  },
  container: {
    gap: 20,
    padding: 4,
  },
});

export default CategoriesSection;
