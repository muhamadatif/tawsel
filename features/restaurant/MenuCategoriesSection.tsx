import { Category } from "@/Constants/Types";
import React, { forwardRef } from "react";
import { LayoutChangeEvent, ScrollView, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import CategoryItem from "../../components/CategoryItem";

type Props = {
  activeCategory: string;
  categories: Category[];
  scrollToSection: (categoryId: string) => void;
  onTabLayout: (categoryId: string) => (event: LayoutChangeEvent) => void;
};

const MenuCategoriesSection = forwardRef<Animated.ScrollView, Props>(
  ({ activeCategory, categories, onTabLayout, scrollToSection }, ref) => {
    return (
      <ScrollView
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.categories]}
      >
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            id={category.id}
            name={category.name}
            width={100}
            activeCategory={activeCategory}
            setActiveCategory={() => scrollToSection(category.id)}
            onLayout={onTabLayout(category.id)}
          />
        ))}
      </ScrollView>
    );
  }
);

MenuCategoriesSection.displayName = "MenuCategoriesSection";

const styles = StyleSheet.create({
  categories: {
    flexDirection: "row",
    gap: 8,
    padding: 8,
    paddingLeft: 16,
  },
});

export default MenuCategoriesSection;
