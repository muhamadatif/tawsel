import * as Location from "expo-location";

export type Place = Location.LocationGeocodedAddress;

export type AddressItem = {
  tag?: string;
  building?: string;
  flat?: string;
  reach?: string;
  street?: string | null;
  region?: string | null;
};
