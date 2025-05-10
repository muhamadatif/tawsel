import DropButton from "@/components/DropButton";
import SearchButton from "@/components/LocationButton";
import { COLORS } from "@/Constants/Colors";
import useBackHandler from "@/hooks/useBackHandler";
import useAddressStore from "@/store/useAddress";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Home = () => {
  const router = useRouter();
  const currentAddress = useAddressStore((state) => state.currentAddress);
  useBackHandler(true);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.title}>
          <View>
            <Text style={styles.headerText}>Hi Ahmed</Text>
            <View style={styles.subHeaderContainer}>
              <Text style={styles.subHeaderText}>Welcome</Text>
              <Text style={[styles.subHeaderText, { color: COLORS.primary }]}>
                Back...
              </Text>
            </View>
          </View>
          <DropButton onPress={() => console.log("hi")} />
        </View>
        <SearchButton
          onPress={() => {
            router.push("/(address)/addressList");
          }}
          address={currentAddress}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: COLORS.white,
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
});

export default Home;
