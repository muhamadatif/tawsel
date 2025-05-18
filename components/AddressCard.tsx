import { COLORS } from "@/Constants/Colors";
import { AddressItem } from "@/Constants/Types";
import useAddressStore from "@/store/useAddress";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "./Modal";

type Props = {
  address: AddressItem;

  activeId: string;
  setActiveId: React.Dispatch<React.SetStateAction<string>>;
};

const AddressCard = ({
  address,

  activeId,
  setActiveId,
}: Props) => {
  const currentAddress = useAddressStore((state) => state.currentAddress);
  const setCurrentAddress = useAddressStore((state) => state.setCurrentAddress);
  const deleteAddress = useAddressStore((state) => state.deleteAddress);

  const [modalPosition, setModalPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const activeAddress = Boolean(currentAddress?.id === address.id);
  const isActive = activeId === address.id;

  const buttonRef = useRef<React.ComponentRef<typeof TouchableOpacity>>(null);
  const handleOpenModal = (id: string) => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setModalPosition({
          x: pageX,
          y: pageY,
          width,
          height,
        });
        setActiveId((prevId) => (prevId === id ? "" : id));
      });
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.cardContainer,
          activeAddress && {
            backgroundColor: COLORS.dark,
          },
        ]}
        onPress={() => {
          setCurrentAddress(address);
          router.replace("/(tabs)/home");
        }}
      >
        <TouchableOpacity
          style={[styles.ellipsisButton]}
          onPress={() => handleOpenModal(address.id)}
          ref={buttonRef}
        >
          <Ionicons
            name="ellipsis-vertical-outline"
            color={activeAddress ? COLORS.white : COLORS.dark}
            size={18}
          />
        </TouchableOpacity>
        <View style={styles.addressBox}>
          <Text
            style={[styles.tagText, activeAddress && { color: COLORS.white }]}
          >
            {address.tag && address.tag.toUpperCase()}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={activeAddress && { color: COLORS.white }}
          >
            {`${`${address?.flat}, ` || ""}${`${address?.building}, ` || ""}${
              address.place?.street !== null ? address.place?.street + ", " : ""
            }${`${address.place?.region}` || ""} `}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        modalPosition={modalPosition}
        isActive={isActive}
        onRequestClose={() => setActiveId("")}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                borderBottomColor: COLORS.grayMedium,
                borderBottomWidth: 0.5,
              },
            ]}
            onPress={() => {
              setActiveId("");
              router.replace({
                pathname: "/(address)/mapViewPage",
                params: { addressToEdit: JSON.stringify(address) },
              });
            }}
          >
            <Ionicons name="pencil-outline" />
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => deleteAddress(address.id)}
          >
            <Ionicons name="trash-outline" />
            <Text>delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },

  ellipsisButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 5,
    borderRadius: 5,
    zIndex: 1,
  },
  addressBox: {
    gap: 10,
  },
  tagText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  modalContent: {
    gap: 5,
    paddingVertical: 10,
  },
  actionButton: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    width: "100%",
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
});
function areEqual(prev: Props, next: Props) {
  const sameAddress = prev.address.id === next.address.id;
  const wasActive = prev.activeId === prev.address.id;
  const isActive = next.activeId === next.address.id;

  // Only re-render if:
  // 1. The address card is the same
  // 2. Its own "active" status hasn't changed
  return sameAddress && wasActive === isActive;
}

export default React.memo(AddressCard, areEqual);
