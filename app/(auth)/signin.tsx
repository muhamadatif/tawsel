import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { COLORS } from "@/Constants/Colors";
import { useKeyboardVisibility } from "@/hooks/useKeyboardVisibility";
import { signinSchema } from "@/schemas/auth";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { z } from "zod";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(true);
  const isKeyboardVisible = useKeyboardVisibility();

  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = (data: any) => {
    let formData: { mobile?: string; email?: string; password: string } = {
      password: data.password,
    };
    if (data.emailOrPhone.startsWith("0")) {
      formData.mobile = data.emailOrPhone;
    } else {
      formData.email = data.emailOrPhone;
    }

    // router.replace("/(tabs)/home");
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: isKeyboardVisible ? 100 : 60 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <View>
        <Text style={styles.headerText}>Sign in</Text>
      </View>
      <View style={styles.form}>
        <FormField
          name="emailOrPhone"
          placeholder="Email or phone number"
          control={control}
          error={errors.emailOrPhone?.message}
          icon={
            <TouchableOpacity onPress={() => resetField("emailOrPhone")}>
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
        <FormField
          name="password"
          placeholder="********"
          control={control}
          error={errors.password?.message}
          secureTextEntry={showPassword}
          icon={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name="eye-outline" color={COLORS.grayDark} size={20} />
            </TouchableOpacity>
          }
        />
        <TouchableOpacity
          style={styles.forgotPasswordBox}
          //   onPress={() => router.push("/(auth)/forgotPassword")}
        >
          <Text
            style={{ color: COLORS.dark, fontSize: 12, fontWeight: "bold" }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      <Button label="Sign in" onPress={handleSubmit(onSubmit)} />

      <View style={styles.footer}>
        <Text
          style={{ fontSize: 12, color: COLORS.grayMedium, fontWeight: "bold" }}
        >
          Don&apos;t have an account?
        </Text>
        <TouchableOpacity
        //  onPress={() => router.push("/(auth)/signup")}
        >
          <Text
            style={{ color: COLORS.dark, fontSize: 16, fontWeight: "bold" }}
          >
            Sign up now
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

export default Signin;
