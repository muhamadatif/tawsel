import { COLORS } from "@/Constants/Colors";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  logo: any;
  name: string;
  description: string;
};

const HeaderSection = ({ logo, name, description }: Props) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={logo} style={styles.headerLogo} />
      <View style={styles.header}>
        <Text style={styles.headerText}>{name}</Text>
        <Text style={styles.subheaderText}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 60,
    backgroundColor: COLORS.dark,
    zIndex: 5,

    padding: 16,
    paddingLeft: 32,
    flexDirection: "row",
    gap: 8,
  },
  headerLogo: { height: 80, width: 80, borderRadius: 40 },
  header: { justifyContent: "center", gap: 6 },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
  subheaderText: { color: COLORS.white, letterSpacing: 2 },
});

export default HeaderSection;
