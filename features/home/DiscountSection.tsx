import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const discount = {
  percentage: 50,
  title: "For Large Pizza",
  description: "Tasty Pizza At Home",
  image: require("@/assets/images/pizza.png"),
};

const DiscountSection = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/Pizza-Discount.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.percentage}>
        <Text style={{ fontWeight: "bold", fontSize: 45 }}>
          {discount.percentage}%
          <Text style={{ fontSize: 18, fontWeight: 600 }}>off</Text>
        </Text>
      </View>
      <View style={styles.description}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          {discount.title}
        </Text>
        <Text style={{ fontWeight: "600" }}>{discount.description}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={discount.image} style={styles.discountImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 160,
    position: "relative",
    marginBottom: 20,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 100,
    position: "absolute",
  },
  percentage: {
    left: 50,
    top: 10,
  },
  description: {
    marginTop: 10,
    left: 20,
  },
  imageContainer: {
    width: 220,
    height: 180,
    right: -10,
    top: 20,
    position: "absolute",
  },
  discountImage: {
    width: "100%",
    height: "100%",
  },
});

export default DiscountSection;
