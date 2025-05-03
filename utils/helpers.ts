import { Place } from "@/Constants/Types";

export const formatAddress = (
  place: Place | null
): { street: string | null; region: string | null } | null => {
  if (!place) return null;

  const { name, street, district, subregion, city, region, country } = place;

  return {
    street,
    region: subregion + " " + region,
  };
};

export function compareNumbers(num1: number, num2: number) {
  const getIntegerAndFirstTwoDecimals = (num: number) => {
    const integerPart = Math.floor(num);
    const firstDecimal = Math.floor((num % 1) * 10000) / 10000;
    return integerPart + firstDecimal;
  };

  const processedNum1 = getIntegerAndFirstTwoDecimals(num1);
  const processedNum2 = getIntegerAndFirstTwoDecimals(num2);

  if (processedNum1 === processedNum2) {
    return true;
  } else {
    return false;
  }
}
