import { COLORS } from "@/Constants/Colors";
import { AddressItem } from "@/Constants/Types";
import useAddressStore from "@/store/useAddress";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = { address: AddressItem };

const AddressCard = ({ address }: Props) => {
  const setCurrentAddress = useAddressStore((state) => state.setCurrentAddress);
  return (
    <>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => {
          setCurrentAddress(address);
        }}
      >
        <TouchableOpacity style={styles.actionBox}>
          <Ionicons name="ellipsis-vertical-outline" />
        </TouchableOpacity>
        <View style={styles.addressBox}>
          <Text style={styles.tagText}>
            {address.tag && address.tag.toUpperCase()}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {`${`${address.building}, ` || ""}${`${address.flat}, ` || ""}${
              `${address.street}, ` || ""
            }${`${address.region}` || ""} `}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    position: "relative",
    padding: 20,
    width: "100%",
    borderRadius: 10,
  },
  actionBox: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: COLORS.primary,
    padding: 5,
    borderRadius: 50,
    zIndex: 1,
  },
  addressBox: {
    gap: 10,
  },
  tagText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  modal: {
    height: 200,
    width: 200,
  },
});
export default AddressCard;
