import { COLORS } from "@/Constants/Colors";
import { AddressItem } from "@/Constants/Types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  location?: string;
  onPress: () => void;
  address?: AddressItem | null;
};

const LocationButton = ({ location, onPress, address }: Props) => {
  const isActive = Boolean(address?.tag);

  return (
    <TouchableOpacity
      style={styles.addressContainer}
      onPress={() => router.push("/(address)/addressList")}
    >
      <Ionicons name="location-outline" size={24} color={COLORS.primary} />
      <View style={{ flex: 1 }}>
        {isActive ? (
          <>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  color: COLORS.grayDark,
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                DELIVER TO{" "}
                <Text style={{ color: COLORS.dark }}>- {address?.tag}</Text>
              </Text>

              <TouchableOpacity
                style={styles.changeButton}
                onPress={() => router.push("/(address)/addressList")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 11,
                    color: COLORS.white,
                  }}
                >
                  Change
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ flexShrink: 1, fontSize: 12 }}
            >
              {address?.flat}, {address?.building},{" "}
              {address?.place?.street && `${address?.place.street},`}
              {""}
              {address?.place?.name} {address?.place?.subregion},{" "}
              {address?.place?.region}
            </Text>
          </>
        ) : (
          <Text style={{ fontWeight: "bold" }}>Select your location</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: "row",
    gap: 5,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: COLORS.grayLight,
  },

  changeButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: COLORS.dark,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.grayLight,
    paddingLeft: 12,
    borderRadius: 5,
    height: 44,
  },
  location: {},
  iconBox: {
    backgroundColor: COLORS.primary,
    height: 44,
    width: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default LocationButton;
