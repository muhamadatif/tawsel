import useRestaurantStore from "@/store/useRestaurants";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import RestaurantCard from "../../components/RestaurantCard";

const RestaurantsSection = () => {
  const { restaurants } = useRestaurantStore();
  const restaurantsArray = Object.values(restaurants);
  return (
    <>
      <Text style={styles.sectionHeader}>
        Yalla, find the best eats near you! 😋
      </Text>
      <FlatList
        contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={restaurantsArray}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default RestaurantsSection;
