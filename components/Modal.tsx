import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
type Props = {
  children: React.ReactNode;

  modalPosition?: { x: number; y: number; width: number; height: number };

  isActive?: boolean;
  onRequestClose: () => void;
};
const Modal = ({
  children,
  modalPosition,
  isActive,
  onRequestClose,
}: Props) => {
  if (!modalPosition) return null;
  if (isActive)
    return (
      <>
        <Pressable style={styles.backdrop} onPress={onRequestClose}></Pressable>

        <View
          style={[
            styles.modal,
            {
              top: modalPosition?.y - 110,
              left: modalPosition?.x - 85,
            },
          ]}
        >
          {children}
        </View>
      </>
    );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    position: "absolute",
    // padding: 10,
    width: 80,
    backgroundColor: "white",
    shadowColor: "#000",
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 10,
  },
});

export default Modal;
