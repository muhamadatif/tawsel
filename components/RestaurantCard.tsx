import { COLORS } from "@/Constants/Colors";
import { Restaurant } from "@/Constants/Types";
import useRestaurantStore from "@/store/useRestaurants";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const toggleFavourite = useRestaurantStore((state) => state.toggleFavourite);

  return (
    <View style={styles.card}>
      <ImageBackground
        source={restaurant.image}
        style={styles.image}
        imageStyle={styles.imageInner}
      >
        <TouchableOpacity
          style={styles.favourite}
          onPress={() => toggleFavourite(restaurant.id)}
        >
          <Ionicons
            name={restaurant.favourite ? "heart" : "heart-outline"}
            size={28}
            color={COLORS.primary}
            // color={restaurant.favourite ? COLORS.primary : COLORS.white}
          />
        </TouchableOpacity>
        <View style={styles.overlay}>
          <Image
            source={restaurant.logo}
            style={styles.logo}
            contentFit="cover"
          />
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.rating}>
            ⭐ {restaurant.rating}
            {restaurant.reviews < 1000 ? `(${restaurant.reviews})` : "(+1000)"}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#ccc",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
  },
  imageInner: {
    borderRadius: 12,
  },
  favourite: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 4,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
  },
  rating: {
    color: "#fff",
    fontSize: 12,
  },
});

export default RestaurantCard;
