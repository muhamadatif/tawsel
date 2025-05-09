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
  padding?: number;
  fontsize?: number;
}

const Button = ({
  label,
  type = "primary",
  onPress,
  disabled,
  fontsize,
  padding = 16,
}: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: TYPES[type], padding: padding },
        disabled && { backgroundColor: COLORS.grayMedium },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[styles.buttonText, { color: LABELS[type], fontSize: fontsize }]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
  },
  buttonText: { textAlign: "center", fontWeight: "bold", fontSize: 16 },
});

export default Button;
