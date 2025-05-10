import { Place } from "@/Constants/Types";

export const formatAddress = (
  place: Place | null
): {
  street: string | null;
  name: string | null;
  region: string | null;
} | null => {
  if (!place) return null;

  const { street, subregion, region, name } = place;

  return {
    street,
    name,
    region: subregion + " " + region,
  };
};

export function compareNumbers(num1: number, num2: number) {
  const getIntegerAndFirstFourDecimals = (num: number) => {
    const integerPart = Math.floor(num);
    const firstDecimal = Math.floor((num % 1) * 10000) / 10000;
    return integerPart + firstDecimal;
  };

  const processedNum1 = getIntegerAndFirstFourDecimals(num1);
  const processedNum2 = getIntegerAndFirstFourDecimals(num2);

  if (processedNum1 === processedNum2) {
    return true;
  } else {
    return false;
  }
}
