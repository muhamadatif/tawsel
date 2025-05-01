import { Stack } from "expo-router";

export default function InitialLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "fade",
        headerShown: false,
      }}
    />
  );
}
