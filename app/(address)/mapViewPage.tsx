import BottomSheetComponent from "@/components/BottomSheetComponent";
import Button from "@/components/Button";
import CompleteAddress from "@/components/CreateEditAddress";
import GooglePlacesSearch from "@/components/GooglePlacesSearch";
import Map from "@/components/Map";
import { COLORS } from "@/Constants/Colors";
import useRequestLocation from "@/hooks/useRequestLocation";
import { formatAddress } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MapView from "react-native-maps";

const MapViewPage = () => {
  const params = useLocalSearchParams();

  const addressToEdit = useMemo(() => {
    if (!params.addressToEdit) return null;
    try {
      return JSON.parse(params.addressToEdit as string);
    } catch {
      return null;
    }
  }, [params.addressToEdit]);

  const isEditing = Boolean(addressToEdit);

  const {
    initialRegion,
    setInitialRegion,
    coords,
    setCoords,
    place,
    setPlace,
  } = useRequestLocation(isEditing);

  useEffect(() => {
    if (!isEditing) return;
    setInitialRegion({
      latitude: addressToEdit.latitude,
      longitude: addressToEdit.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    setCoords({
      latitude: addressToEdit.latitude,
      longitude: addressToEdit.longitude,
    });
    setPlace(addressToEdit.place);
  }, [isEditing, addressToEdit, setInitialRegion, setCoords, setPlace]);

  const mapRef = useRef<MapView>(null);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const address = formatAddress(place);
  const { street = "", region = "" } = address || {};

  if (!initialRegion) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <GooglePlacesSearch
            setPlace={setPlace}
            setCoords={setCoords}
            mapRef={mapRef}
          />
        </View>
        <Map
          initialRegion={initialRegion}
          setCoords={setCoords}
          setPlace={setPlace}
          mapRef={mapRef}
        />
        <View style={styles.footer}>
          <View style={styles.locationContainer}>
            <Ionicons
              name="location-outline"
              size={45}
              color={COLORS.primary}
            />
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
          <Button
            label="CONFIRM LOCATION"
            onPress={() => {
              bottomSheetRef.current?.present();
            }}
            disabled={!place}
          />
        </View>
        <BottomSheetComponent ref={bottomSheetRef}>
          <CompleteAddress
            place={place}
            coords={coords}
            modalRef={bottomSheetRef}
            addressToEdit={addressToEdit}
          />
        </BottomSheetComponent>
      </View>
    </TouchableWithoutFeedback>
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
    width: "90%",
    alignSelf: "center",
    zIndex: 50000,
    top: 60,
    alignItems: "center",
    justifyContent: "center",
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
