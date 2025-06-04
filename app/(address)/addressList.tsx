import Button from "@/components/Button";
import { COLORS } from "@/Constants/Colors";
import AddressCard from "@/features/address/AddressCard";
import useAddressStore from "@/store/useAddress";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AddressListScreen() {
  const [activeId, setActiveId] = useState("");

  const addressList = useAddressStore((state) => state.addressList);

  return (
    <>
      {addressList.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {addressList.map((address, index) => (
            <AddressCard
              key={index}
              address={address}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noAddressContainer}>
          <Ionicons
            name="location-outline"
            size={150}
            color={COLORS.grayLight}
          />
          <View style={styles.noAddressContent}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              No address has been added yet!
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              Add your delivery location and start order
            </Text>
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <Button
          label="Add new address"
          onPress={() => router.push("/mapViewPage")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    flexGrow: 1,
    backgroundColor: "white",
    gap: 20,
  },
  noAddressContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    marginTop: -30,
    backgroundColor: COLORS.white,
    flexGrow: 1,
  },
  noAddressContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
});
