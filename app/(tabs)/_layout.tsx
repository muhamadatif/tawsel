import { COLORS } from "@/Constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Pressable, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TABS = [
  { name: "deals", icon: "flame" as keyof typeof Ionicons.glyphMap },
  { name: "test", icon: "grid" as keyof typeof Ionicons.glyphMap },
  { name: "home", icon: "home" as keyof typeof Ionicons.glyphMap },
  { name: "search", icon: "search" as keyof typeof Ionicons.glyphMap },
  { name: "orders", icon: "fast-food" as keyof typeof Ionicons.glyphMap },
];

export default function TabLayout() {
  return (
    // <View style={{ flex: 1, backgroundColor: "white" }}>
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <Tabs
        initialRouteName="home"
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarInactiveTintColor: COLORS.primary,

          tabBarStyle: {
            backgroundColor: COLORS.white,
            borderWidth: 1,
            borderColor: COLORS.grayMedium,
            borderBottomWidth: 0,
            height: 70,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            marginTop: -10,
            bottom: 0,
            elevation: 0,
          },
        }}
      >
        {TABS.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              tabBarButton: (props) => (
                <Pressable
                  {...props}
                  android_ripple={{ color: "transparent" }}
                  style={({ pressed }) => [
                    { opacity: pressed ? 0.7 : 1, alignSelf: "center" },
                  ]}
                />
              ),
              tabBarIcon: ({ size, color, focused }) => (
                <View style={styles.tabContainer}>
                  <View style={[styles.tab, focused && styles.activeTab]}>
                    <Ionicons
                      name={tab.icon}
                      size={size}
                      color={focused ? COLORS.white : color}
                    />
                    {focused && <View style={styles.point} />}
                  </View>
                </View>
              ),
            }}
          />
        ))}
      </Tabs>
    </SafeAreaView>
    // </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    gap: 5,
    marginTop: 22,
    position: "relative",
    height: 60,
    bottom: 0,
  },
  tab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: COLORS.dark,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  point: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.dark,
    position: "absolute",
    bottom: -10,
  },
});
