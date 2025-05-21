import Categories from "@/components/home/Categories";
import Discount from "@/components/home/Discount";
import Header from "@/components/home/Header";
import Restaurants from "@/components/home/Restaurants";
import { COLORS } from "@/Constants/Colors";
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
      <Header />
      <View style={styles.main}>
        <Discount />
        <Categories />
        <Restaurants />
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
