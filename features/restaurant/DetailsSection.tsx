import { COLORS } from "@/Constants/Colors";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  discount: number | null;
  deliveryTime: string;

  rating: number;
};

const DetailsSection = ({ discount, deliveryTime, rating }: Props) => {
  return (
    <View style={{ gap: 6, paddingHorizontal: 16 }}>
      {discount && (
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>
          <Text>🎉</Text>
          {"  "}
          {discount}
          {"% "}
          <Text style={{ fontWeight: "bold", fontSize: 12 }}>off</Text>
        </Text>
      )}
      <Text style={{ color: COLORS.grayDark, fontSize: 12 }}>
        Delivery in {deliveryTime}
        {"  "}Rating: {rating}
      </Text>
    </View>
  );
};

export default DetailsSection;
