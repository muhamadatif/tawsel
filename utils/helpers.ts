import { Place } from "@/Constants/Types";

export const formatAddress = (place: Place | null): string => {
  if (!place) return "Unknown location";

  const { name, street, district, subregion, city, region, country } = place;
  console.log(name, street, district, subregion, city, region, country);

  return [name || street, district || subregion, city, region, country]
    .filter(Boolean)
    .join(", ");
};
