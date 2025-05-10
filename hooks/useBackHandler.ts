import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { BackHandler } from "react-native";

export default function useBackHandler(isHomeTab: boolean) {
  useFocusEffect(
    useCallback(() => {
      if (!isHomeTab) return;

      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [isHomeTab])
  );
}
