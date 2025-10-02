import LoginImage from "@/assets/images/dg-onboarding.png";
import PrimaryButton from "@/components/PrimaryButton";
import { useAuth } from "@/context/AuthContext";
import { LoginFormData, loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Image, Text, View } from "dripsy";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";

export default function LoginScreen() {
   const [error, setError] = useState("");
   const { login } = useAuth();
   const router = useRouter();

   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
   });

   const onSubmit = async (data: LoginFormData) => {
      console.log("✅ Login data:", data);
      try {
         const user = await login(data.email, data.password);
         console.log("Logged in:", user);
      } catch (err) {
         const error = err as AxiosError<{ message: string }>;
         setError(error.response?.data?.message || "Login failed");
      }
   };

   return (
      <View sx={{ flex: 1, backgroundColor: "$darkGreen" }}>
         <View sx={{ width: "100%", height: 340 }}>
            <Image
               source={LoginImage}
               style={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden", // keeps rounded corners
               }}
            />
            {/* Gradient overlay */}
            <LinearGradient
               colors={["transparent", "#102111"]} // fade into background color
               style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 140, // how tall the fade is
               }}
            />
         </View>
         <View
            sx={{
               flex: 1,
               justifyContent: "center",
               padding: 20,
            }}>
            <View
               sx={{
                  position: "relative",
                  bottom: 60,
                  width: "90%",
                  alignSelf: "center",
                  alignItems: "center",
                  marginBottom: 42,
               }}>
               <Text
                  sx={{
                     fontSize: 32,
                     fontFamily: "NunitoBold",
                     color: "white",
                     textAlign: "center",
                  }}>
                  Welcome Back
               </Text>
               <Text
                  sx={{
                     fontSize: 15,
                     fontFamily: "NunitoBold",
                     color: "$lightGray",
                     paddingHorizontal: 16,
                     textAlign: "center",
                  }}>
                  Log in to continue your discgolf journey
               </Text>
            </View>

            {/* Login Form Section */}
            <View sx={{ position: "relative", bottom: 100 }}>
               {/* Email */}
               <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                     <>
                        <TextInput
                           placeholder="Email"
                           placeholderTextColor="#576f59" // instead of $greenFormText
                           style={{
                              backgroundColor: "#293728", // instead of $greenFormBg
                              borderColor: errors.email ? "red" : "#293728",
                              borderRadius: 10,
                              padding: 12,
                              borderWidth: 1,
                              marginTop: 24,
                              marginBottom: 14,
                              color: "white",
                           }}
                           onBlur={onBlur}
                           onChangeText={onChange}
                           value={value}
                           keyboardType="email-address"
                           autoCapitalize="none"
                        />
                        {errors.email && (
                           <Text sx={{ color: "red", mb: 2 }}>
                              {errors.email.message}
                           </Text>
                        )}
                     </>
                  )}
               />

               {/* Password */}
               <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                     <>
                        <TextInput
                           placeholder="Password"
                           placeholderTextColor="#576f59" // hardcoded instead of theme
                           secureTextEntry
                           style={{
                              backgroundColor: "#293728", // instead of $greenFormBg
                              borderColor: errors.password ? "red" : "#293728",
                              borderRadius: 10,
                              padding: 12,
                              borderWidth: 1,
                              marginBottom: 3,
                              color: "white",
                           }}
                           onBlur={onBlur}
                           onChangeText={onChange}
                           value={value}
                        />
                        {errors.password && (
                           <Text sx={{ color: "red", mb: 2 }}>
                              {errors.password.message}
                           </Text>
                        )}
                     </>
                  )}
               />
               <Text
                  sx={{
                     color: "$forestGreen",
                     fontSize: 14,
                     mb: 20,
                     mt: 12,
                     textAlign: "center",
                  }}>
                  Forgot Password?
               </Text>

               {/* Login Button */}
               <View sx={{ width: "100%", alignItems: "center" }}>
                  <PrimaryButton
                     title="Log In"
                     loadingTitle="Logging in"
                     onPress={handleSubmit(onSubmit)}></PrimaryButton>
               </View>

               {/* Backend error */}
               {error ? (
                  <Text sx={{ color: "red", mt: 10, textAlign: "center" }}>
                     {error}
                  </Text>
               ) : null}

               <Text
                  sx={{
                     color: "$mattGreen",
                     fontSize: 14,
                     mt: 28,
                     textAlign: "center",
                  }}>
                  Don't have an account?{" "}
                  <Text
                     onPress={() => router.push("/register")}
                     sx={{
                        fontFamily: "NunitoBold",
                        color: "$lightGreen",
                        fontSize: 14,
                     }}>
                     Sign Up
                  </Text>
               </Text>
            </View>
         </View>
      </View>
   );
}
