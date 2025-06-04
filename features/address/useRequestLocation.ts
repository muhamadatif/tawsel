import { Place } from "@/Constants/Types";
import * as Location from "expo-location";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, AppState, Linking, Platform } from "react-native";
import { Region } from "react-native-maps";

const useRequestLocation = (isEditing: boolean) => {
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);
  const [coords, setCoords] = useState({});
  const [place, setPlace] = useState<Place | null>(null);

  const fromSettings = useRef(false);
  const locationSubscription = useRef<Location.LocationSubscription | null>(
    null
  );

  const startWatchingLocation = async () => {
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

    // Start watching
    locationSubscription.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 3000,
        distanceInterval: 2,
      },
      async (location) => {
        const { latitude, longitude } = location.coords;

        // Only update if location has changed meaningfully
        const prev = coords as { latitude?: number; longitude?: number };
        const isSameLocation =
          Math.abs(latitude - (prev.latitude || 0)) < 0.0001 &&
          Math.abs(longitude - (prev.longitude || 0)) < 0.0001;

        if (isSameLocation) return;

        setCoords({ latitude, longitude });
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });

        try {
          const [foundPlace] = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });
          setPlace(foundPlace);
        } catch (error) {
          console.error("Reverse geocoding failed", error);
        }
      }
    );
  };

  const stopWatchingLocation = () => {
    locationSubscription.current?.remove();
    locationSubscription.current = null;
  };

  useFocusEffect(
    useCallback(() => {
      if (isEditing) return;

      startWatchingLocation();

      return () => {
        stopWatchingLocation();
      };
    }, [isEditing])
  );

  useEffect(() => {
    if (isEditing) {
      stopWatchingLocation();
      return;
    }

    const subscription = AppState.addEventListener("change", async (state) => {
      if (state === "active" && fromSettings.current) {
        fromSettings.current = false;
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status !== "granted") {
          router.back();
        } else {
          startWatchingLocation();
        }
      }
    });

    return () => {
      subscription.remove();
      stopWatchingLocation();
    };
  }, [isEditing]);

  return {
    initialRegion,
    setInitialRegion,
    coords,
    setCoords,
    place,
    setPlace,
  };
};

export default useRequestLocation;

// import { Place } from "@/Constants/Types";
// import * as Location from "expo-location";
// import { router, useFocusEffect } from "expo-router";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { Alert, AppState, Linking, Platform } from "react-native";
// import { Region } from "react-native-maps";

// const useRequestLocation = (isEditing: boolean) => {
//   const [initialRegion, setInitialRegion] = useState<Region | null>(null);
//   const [coords, setCoords] = useState({});
//   const [place, setPlace] = useState<Place | null>(null);

//   const fromSettings = useRef(false);

//   useFocusEffect(
//     useCallback(() => {
//       if (isEditing) return;
//       requestLocation();
//     }, [isEditing])
//   );

//   useEffect(() => {
//     if (isEditing) return;
//     const subscription = AppState.addEventListener("change", async (state) => {
//       if (state === "active" && fromSettings.current) {
//         fromSettings.current = false;
//         const { status } = await Location.getForegroundPermissionsAsync();
//         if (status !== "granted") {
//           router.back();
//         } else {
//           requestLocation();
//         }
//       }
//     });

//     return () => subscription.remove();
//   }, [isEditing]);

//   const requestLocation = async () => {
//     const { status, canAskAgain } =
//       await Location.requestForegroundPermissionsAsync();

//     if (status !== "granted") {
//       if (!canAskAgain) {
//         Alert.alert(
//           "Location Permanently Denied",
//           "You need to enable location permission in settings.",
//           [
//             {
//               text: "Go to Settings",
//               onPress: () => {
//                 fromSettings.current = true;
//                 if (Platform.OS === "ios") {
//                   Linking.openURL("app-settings:");
//                 } else {
//                   Linking.openSettings();
//                 }
//               },
//             },
//             { text: "Cancel", onPress: () => router.back(), style: "cancel" },
//           ]
//         );
//       } else {
//         Alert.alert(
//           "Location Permission Denied",
//           "Location access is required to show your position.",
//           [{ text: "OK", onPress: () => router.back() }]
//         );
//       }
//       return;
//     }

//     const location = await Location.getCurrentPositionAsync({
//       accuracy: Location.Accuracy.Highest,
//     });
//     const { latitude, longitude } = location.coords;

//     try {
//       const [place] = await Location.reverseGeocodeAsync({
//         latitude,
//         longitude,
//       });
//       setPlace(place);
//     } catch (error) {
//       console.error("Reverse geocoding failed");
//     }

//     setCoords({ latitude, longitude });

//     setInitialRegion({
//       latitude,
//       longitude,
//       latitudeDelta: 0.005,
//       longitudeDelta: 0.005,
//     });
//   };

//   return {
//     initialRegion,
//     setInitialRegion,
//     coords,
//     setCoords,
//     place,
//     setPlace,
//   };
// };

// export default useRequestLocation;
