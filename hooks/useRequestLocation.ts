import { Place } from "@/Constants/Types";
import * as Location from "expo-location";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, AppState, Linking, Platform } from "react-native";
import { Region } from "react-native-maps";

const useRequestLocation = () => {
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);
  const [coords, setCoords] = useState({});
  const [place, setPlace] = useState<Place | null>(null);

  const fromSettings = useRef(false);

  useFocusEffect(
    useCallback(() => {
      requestLocation();
    }, [])
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (state) => {
      if (state === "active" && fromSettings.current) {
        fromSettings.current = false;
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status !== "granted") {
          router.back();
        } else {
          requestLocation();
        }
      }
    });

    return () => subscription.remove();
  }, []);

  const requestLocation = async () => {
    const { status, canAskAgain } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      if (!canAskAgain) {
        Alert.alert(
          "Location Permanently Denied",
          "You need to enable location permission in settings.",
          [
            {
              text: "Go to Settings",
              onPress: () => {
                fromSettings.current = true;
                if (Platform.OS === "ios") {
                  Linking.openURL("app-settings:");
                } else {
                  Linking.openSettings();
                }
              },
            },
            { text: "Cancel", onPress: () => router.back(), style: "cancel" },
          ]
        );
      } else {
        Alert.alert(
          "Location Permission Denied",
          "Location access is required to show your position.",
          [{ text: "OK", onPress: () => router.back() }]
        );
      }
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    try {
      const [place] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      setPlace(place);
    } catch (error) {
      console.error("Reverse geocoding failed");
    }

    setCoords({ latitude, longitude });

    setInitialRegion({
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  return {
    initialRegion,
    coords,
    setCoords,
    place,
    setPlace,
  };
};

export default useRequestLocation;
