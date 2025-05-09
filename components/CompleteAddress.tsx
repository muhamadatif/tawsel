import { COLORS } from "@/Constants/Colors";
import { TAGS } from "@/Constants/Constants";
import { addressSchema } from "@/schemas/app";
import useAddressStore from "@/store/useAddress";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { RefObject, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { z } from "zod";
import Button from "./Button";
import FormField from "./FormField";

type Props = {
  street: string | null;
  region: string | null;
  modalRef: RefObject<BottomSheetModal | null>;
};

const CompleteAddress = ({ street, region, modalRef }: Props) => {
  const setCurrentAddress = useAddressStore((state) => state.setCurrentAddress);
  const addAddressToList = useAddressStore((state) => state.addAddressToList);

  const [tagLocation, setTagLocation] = useState("HOME");
  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
    watch,
  } = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
  });

  const isActive = watch("building") && watch("flat");

  const onSubmit = (data: z.infer<typeof addressSchema>) => {
    const address = {
      id: Date.now().toLocaleString(),
      tag: tagLocation,
      ...data,
      street,
      region,
    };

    setCurrentAddress(address);
    addAddressToList(address);
    modalRef.current?.dismiss();
    router.push("/home");
  };
  return (
    <ScrollView
      style={styles.modalContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 300 }}
    >
      <Text style={{ color: COLORS.grayMedium, fontWeight: "bold" }}>
        Complete your address
      </Text>
      <View style={styles.locationBox}>
        <Text
          style={{ fontWeight: "bold", flexShrink: 1 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {street && `${street}`} {region}
        </Text>
        <TouchableOpacity
          style={styles.changeButton}
          onPress={() => {
            modalRef.current?.dismiss();
          }}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 12, color: COLORS.white }}
          >
            CHANGE
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormField
            name="building"
            placeholder="Building No./Name*"
            control={control}
            error={errors.building?.message}
            type="address"
          />
          <FormField
            name="flat"
            placeholder="Flat No./Name*"
            control={control}
            error={errors.flat?.message}
            type="address"
          />
        </View>
        <View>
          <FormField
            name="reach"
            placeholder="How to reach (Optional)"
            control={control}
            style={[styles.input, { width: "100%" }]}
            type="address"
          />
        </View>
        <View style={styles.tagBox}>
          <Text style={{ fontWeight: "bold" }}>Tag location:</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {TAGS.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tagButton,
                  tag === tagLocation && { backgroundColor: COLORS.primary },
                ]}
                onPress={() => setTagLocation(tag)}
              >
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <Button
        label="continue"
        onPress={handleSubmit(onSubmit)}
        disabled={!Boolean(isActive)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    paddingTop: 25,
  },

  locationBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "#fff",
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  changeButton: {
    backgroundColor: COLORS.dark,
    padding: 7,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  form: {
    marginBottom: 40,
  },
  input: {
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    width: "45%",
  },
  tagBox: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",

    justifyContent: "space-between",
  },
  tagButton: {
    backgroundColor: COLORS.grayLight,
    padding: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  tagText: {
    fontSize: 13,
    fontWeight: "500",
  },
});

export default CompleteAddress;
