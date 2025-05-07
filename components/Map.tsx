import { Place } from "@/Constants/Types";
import { compareNumbers } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { RefObject } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Region } from "react-native-maps";
import Pulse from "./Pulse";

type Props = {
  initialRegion: Region | null;
  setCoords: React.Dispatch<
    React.SetStateAction<{ latitude: number; longitude: number }>
  >;
  setPlace: React.Dispatch<React.SetStateAction<Place | null>>;
  mapRef: RefObject<MapView | null>;
};

const Map = ({ initialRegion, setCoords, setPlace, mapRef }: Props) => {
  const recenterToUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Location permission not granted");
        return;
      }

      let location = await Location.getLastKnownPositionAsync();
      if (!location) {
        location = await Location.getCurrentPositionAsync({});
      }

      const { latitude, longitude } = location.coords;

      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };

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
      mapRef.current?.animateToRegion(newRegion, 1000);
    } catch (err) {
      console.error("Error fetching location:");
    }
  };

  const onRegionChange = (region: Region) => {
    const isEqual =
      compareNumbers(initialRegion!.latitude, region.latitude) &&
      compareNumbers(initialRegion!.longitude, region.longitude);
    !isEqual && setPlace(null);
  };

  const handleRegionChangeComplete = async (region: Region) => {
    const { latitude, longitude } = region;
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
  };

  if (!initialRegion) return null;

  return (
    <>
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        initialRegion={initialRegion}
        onRegionChange={onRegionChange}
        onRegionChangeComplete={handleRegionChangeComplete}
      />

      <View style={styles.centerOverlay}>
        <Pulse />
        <View style={styles.dot} />
      </View>

      <TouchableOpacity
        style={styles.gpsButton}
        onPress={recenterToUserLocation}
      >
        <Ionicons name="locate" size={24} color="#007AFF" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  centerOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -15,
    marginTop: -15,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
    position: "absolute",
  },
  gpsButton: {
    position: "absolute",
    bottom: 300,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 20,
  },
});

export default Map;

// if (timerRef.current) clearTimeout(timerRef.current);
// timerRef.current = setTimeout(async () => {
//   const { latitude, longitude } = region;
//   try {
//     const [place] = await Location.reverseGeocodeAsync({
//       latitude,
//       longitude,
//     });
//     setPlace(place);
//     setCoords({ latitude, longitude });
//   } catch (error) {
//     console.error("Reverse geocoding failed", error);
//   }
// }, 100);
