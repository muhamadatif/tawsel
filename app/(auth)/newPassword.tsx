import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { COLORS } from "@/Constants/Colors";
import { useKeyboardVisibility } from "@/hooks/useKeyboardVisibility";
import { newPasswordSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

const NewPassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const isKeyboardVisible = useKeyboardVisibility();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
  } = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = (data: any) => {
    router.replace("/(tabs)/home");
  };
  return (
    <>
      <StatusBar style="dark" backgroundColor={COLORS.primary} />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>New Password</Text>
        <Text style={styles.subHeader}>
          Set the new password for your account
        </Text>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: isKeyboardVisible ? 100 : 60 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.form}>
          <FormField
            name="password"
            placeholder="New password"
            control={control}
            error={errors.password?.message}
            secureTextEntry={showPassword}
            icon={
              <TouchableOpacity onPress={() => resetField("password")}>
                <Text
                  style={{
                    color: COLORS.grayDark,
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  Clear
                </Text>
              </TouchableOpacity>
            }
          />
        </View>
        <Button
          type="secondary"
          label="Reset password"
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1, padding: 36 },
  headerContainer: {
    gap: 15,
    backgroundColor: COLORS.primary,
    height: 150,
    padding: 35,
  },
  header: {
    color: COLORS.dark,
    fontWeight: "bold",
    fontSize: 25,
  },
  subHeader: {
    color: COLORS.dark,
    fontSize: 14,
    fontWeight: "500",
  },
  form: {
    marginBottom: 70,
  },
  forgotPasswordBox: {
    alignSelf: "flex-end",
    marginTop: -14,
  },
  footer: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
});

export default NewPassword;
