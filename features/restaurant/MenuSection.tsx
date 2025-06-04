import { COLORS } from "@/Constants/Colors";
import { Category } from "@/Constants/Types";
import React from "react";
import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import MenuItem from "../../components/MenuItem";

type Props = {
  categories: Category[];
  onSectionLayout: (categoryId: string) => (event: LayoutChangeEvent) => void;
};

const MenuSection = ({ categories, onSectionLayout }: Props) => {
  return (
    <View>
      {categories.map((category) => (
        <View
          key={category.id}
          style={styles.category}
          onLayout={onSectionLayout(category.id)}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginVertical: 10,
            }}
          >
            {category.name}
          </Text>
          {category.items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    paddingVertical: 8,
    paddingBottom: 25,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.grayLight,
    gap: 16,
  },
});

export default MenuSection;
