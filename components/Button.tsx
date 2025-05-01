import { COLORS } from "@/Constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const TYPES = {
  primary: COLORS.primary,
  secondary: COLORS.dark,
};

const LABELS = {
  primary: COLORS.dark,
  secondary: COLORS.white,
};

interface Props {
  label: string;
  type?: "primary" | "secondary";
  onPress: () => void;
  disabled?: boolean;
}

const Button = ({ label, type = "primary", onPress, disabled }: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: TYPES[type] },
        disabled && { backgroundColor: COLORS.grayMedium },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, { color: LABELS[type] }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    padding: 16,
    borderRadius: 8,
  },
  buttonText: { textAlign: "center", fontWeight: "bold", fontSize: 16 },
});

export default Button;
