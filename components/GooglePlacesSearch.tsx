import { Place } from "@/Constants/Types";
import * as Location from "expo-location";
import React, { RefObject, useEffect, useRef } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView from "react-native-maps";

type Props = {
  setCoords: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
    }>
  >;
  setPlace: React.Dispatch<React.SetStateAction<Place | null>>;
  mapRef: RefObject<MapView | null>;
};

const GooglePlacesSearch = ({ setCoords, setPlace, mapRef }: Props) => {
  const autoCompleteRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current) {
      console.log("MapView ref initialized", mapRef.current);
    } else {
      console.log("MapView ref is null");
    }
  }, [mapRef]);

  return (
    <GooglePlacesAutocomplete
      ref={autoCompleteRef}
      placeholder="Search"
      query={{
        key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        language: "en",
        types: "geocode",
      }}
      autoFillOnNotFound={false}
      currentLocation={false}
      currentLocationLabel="Current location"
      debounce={100}
      disableScroll={true}
      enableHighAccuracyLocation={true}
      enablePoweredByContainer={true}
      fetchDetails={true}
      filterReverseGeocodingByTypes={[]}
      GooglePlacesDetailsQuery={{}}
      GooglePlacesSearchQuery={{
        rankby: "distance",
        type: "restaurant",
      }}
      GoogleReverseGeocodingQuery={{}}
      isRowScrollable={true}
      keyboardShouldPersistTaps="always"
      listUnderlayColor="#c8c7cc"
      listViewDisplayed="auto"
      keepResultsAfterBlur={false}
      minLength={1}
      nearbyPlacesAPI="GooglePlacesSearch"
      numberOfLines={1}
      onFail={() => {}}
      onNotFound={() => {}}
      onPress={async (data, details) => {
        if (!details || !details.geometry) return;

        const latitude = details.geometry.location.lat;
        const longitude = details.geometry.location.lng;

        try {
          const [place] = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });
          setPlace(place);
        } catch (error) {
          console.error("Reverse geocoding failed", error);
        }

        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        } else {
          console.log("MapView ref is null during onPress");
        }

        setCoords({ latitude, longitude });
        autoCompleteRef.current?.clear();
      }}
      onTimeout={() =>
        console.warn("google places autocomplete: request timeout")
      }
      predefinedPlaces={[]}
      predefinedPlacesAlwaysVisible={false}
      styles={{
        textInputContainer: {
          width: "100%",
        },
        textInput: {
          height: 44,
          color: "#000",
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
        },
        listView: {},
      }}
      suppressDefaultStyles={false}
      textInputHide={false}
      textInputProps={{
        onFocus: () => {},
        onBlur: () => {
          autoCompleteRef.current?.clear();
        },
      }}
      timeout={20000}
    />
  );
};

export default GooglePlacesSearch;
