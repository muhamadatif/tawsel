import { COLORS } from "@/Constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddressLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="addressList"
        options={{
          header: () => (
            <>
              <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
              />
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
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="mapViewPage"
        options={{
          header: () => (
            <StatusBar backgroundColor="white" barStyle="dark-content" />
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // height: 80,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingBottom: 20,
    paddingTop: 60,
    // marginTop: 30,
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
