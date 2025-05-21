import * as Location from "expo-location";

export type Place = Location.LocationGeocodedAddress;

export type AddressItem = {
  id: string;
  tag: string;
  building: string;
  flat: string;
  reach?: string;
  place: Place | null;
  latitude: number;
  longitude: number;
};

export type Restaurant = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  logo: any;
  image: any;
  favourite: boolean;
};
