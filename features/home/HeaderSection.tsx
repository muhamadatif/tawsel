import { COLORS, Colors } from "@/Constants/Colors";
import useAddressStore from "@/store/useAddress";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

import DropButton from "../../components/DropButton";
import LocationButton from "../../components/LocationButton";

const HeaderSection = () => {
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();
  const currentAddress = useAddressStore((state) => state.currentAddress);
  return (
    <View style={styles.headerSection}>
      <View style={styles.title}>
        <View>
          <Text style={styles.headerText}>Hi Ahmed</Text>
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeaderText}>Welcome</Text>
            <Text
              style={[
                styles.subHeaderText,
                { color: Colors[colorScheme].primary },
              ]}
            >
              Back...
            </Text>
          </View>
        </View>
        <DropButton onPress={() => console.log("hi")} />
      </View>
      <LocationButton
        onPress={() => {
          router.push("/(address)/addressList");
        }}
        address={currentAddress}
      />
    </View>
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

export default HeaderSection;
