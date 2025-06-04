import { COLORS } from "@/Constants/Colors";
import { MenuItemType } from "@/Constants/Types";
import { Image } from "expo-image";
import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MenuItem = memo(({ item }: { item: MenuItemType }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBox}>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>+</Text>
      </TouchableOpacity>
      <View>
        <Image
          source={item.image}
          style={{ width: 80, height: 80, borderRadius: 40 }}
          cachePolicy="memory-disk" // Cache aggressively
          recyclingKey={item.id} // Reuse image instances
          transition={200} // Smooth fade-in
          priority="high" // Prioritize visible images
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {item.description}
        </Text>
      </View>
    </View>
  );
});

MenuItem.displayName = "MenuItem";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.grayMedium,
    padding: 16,
    paddingRight: 30,
    borderRadius: 8,
    gap: 16,
    position: "relative",
  },
  iconBox: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    zIndex: 1,
  },
  price: {
    color: COLORS.grayDark,
    fontSize: 10,
    fontWeight: "bold",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  description: {
    fontWeight: "bold",
    color: COLORS.grayDark,
    flexWrap: "wrap",
    flexShrink: 1,
    fontSize: 10,
  },
});

export default MenuItem;
