import { COLORS } from "@/Constants/Colors";
import CategoriesSection from "@/features/home/CategoriesSection";
import DiscountSection from "@/features/home/DiscountSection";
import HeaderSection from "@/features/home/HeaderSection";
import RestaurantsSection from "@/features/home/RestaurantsSection";
import useBackHandler from "@/hooks/useBackHandler";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Home = () => {
  useBackHandler(true);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <HeaderSection />
      <View style={styles.main}>
        <DiscountSection />
        <CategoriesSection />
        <RestaurantsSection />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: COLORS.white,
    gap: 20,
  },
  headerSection: {
    gap: 15,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: { fontSize: 18, fontWeight: "400" },
  subHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  subHeaderText: { fontWeight: "bold", fontSize: 26, color: COLORS.dark },
  main: {
    gap: 20,
  },
});

export default Home;
