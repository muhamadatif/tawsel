import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { COLORS } from "@/Constants/Colors";
import { useKeyboardVisibility } from "@/hooks/useKeyboardVisibility";
import { signupSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { z } from "zod";

const Signup = () => {
  const router = useRouter();
  const isKeyboardVisible = useKeyboardVisibility();

  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = () => {
    router.replace("/(auth)/verificationSignup");
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: isKeyboardVisible ? 100 : 60 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <View>
        <Text style={styles.headerText}>Sign up</Text>
      </View>
      <View style={styles.form}>
        <FormField
          name="phone"
          placeholder="Enter your phone number"
          control={control}
          error={errors.phone?.message}
          icon={
            <TouchableOpacity onPress={() => resetField("phone")}>
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
          // label="Email or phone"
        />
      </View>
      <Button label="Sign up" onPress={handleSubmit(onSubmit)} />
      <View style={styles.footer}>
        <Text
          style={{ fontSize: 12, color: COLORS.grayMedium, fontWeight: "bold" }}
        >
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signin")}>
          <Text
            style={{ color: COLORS.dark, fontSize: 16, fontWeight: "bold" }}
          >
            Sign in now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 36,
  },
  headerText: {
    color: COLORS.dark,
    fontWeight: "bold",
    fontSize: 25,
  },
  form: {
    marginBottom: 70,
    marginTop: 100,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayMedium,
    paddingBottom: 70,
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

export default Signup;
