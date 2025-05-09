import { COLORS } from "@/Constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AddressLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="addressList"
        options={{
          header: () => (
            <>
              <StatusBar backgroundColor={COLORS.primary} />
              <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="chevron-back" size={22} />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                  <Text style={styles.header}>Address list</Text>
                </View>
              </View>
            </>
          ),
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="mapViewPage"
        options={{
          header: () => <StatusBar backgroundColor="white" style="dark" />,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginTop: 30,
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: -22,
  },
});
