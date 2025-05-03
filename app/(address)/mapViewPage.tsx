import Button from "@/components/Button";
import Map from "@/components/Map";
import { COLORS } from "@/Constants/Colors";
import useRequestLocation from "@/hooks/useRequestLocation";
import { formatAddress } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

const MapViewPage = () => {
  const { initialRegion, coords, setCoords, place, setPlace } =
    useRequestLocation();
  const address = formatAddress(place);
  const { street = "", region = "" } = address || {};
  console.log(street, region);

  const mapRef = useRef<MapView>(null);

  if (!initialRegion) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Map
        initialRegion={initialRegion}
        setCoords={setCoords}
        setPlace={setPlace}
        mapRef={mapRef}
      />
      <View style={styles.footer}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={45} color={COLORS.primary} />
          {!!place && (
            <View style={styles.detailsContainer}>
              {street && <Text>{street}</Text>}
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ fontWeight: "bold" }}
              >
                {region}
              </Text>
            </View>
          )}
        </View>
        <Button label="CONFIRM LOCATION" onPress={() => {}} disabled={!place} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
    top: 10,
    alignItems: "center",
  },
  footer: {
    width: "100%",
    height: 170,
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    padding: 16,
    gap: 25,
  },
  locationContainer: { flexDirection: "row", gap: 5 },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 5,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: COLORS.grayLight,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default MapViewPage;
