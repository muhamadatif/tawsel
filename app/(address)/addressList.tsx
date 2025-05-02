import Button from "@/components/Button";
import { COLORS } from "@/Constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AddressListScreen() {
  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label="Add new address"
          //   onPress={() => router.replace("/mapView")}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  noAddressContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    marginTop: -50,
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
