import { RegisterFormData, registerSchema } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image, Text, View } from "dripsy";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, TouchableOpacity } from "react-native";

export default function RegisterScreen() {
   const router = useRouter();
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
   });

   const onSubmit = (data: RegisterFormData) => {
      console.log("✅ Register data:", data);
   };

   return (
      <View sx={{ flex: 1, backgroundColor: "$darkGreen" }}>
         <View sx={{ width: "100%", height: 340 }}>
            <Image
               source={require("../../assets/images/dg-forest.png")}
               style={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
               }}
            />
            <LinearGradient
               colors={["transparent", "#102111"]}
               style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 140,
               }}
            />
         </View>

         <View sx={{ flex: 1, justifyContent: "center", padding: 20 }}>
            {/* Heading */}
            <View
               sx={{
                  position: "relative",
                  bottom: 70,
                  width: "90%",
                  alignSelf: "center",
                  alignItems: "center",
                  marginBottom: 36,
               }}>
               <Text
                  sx={{
                     fontSize: 32,
                     fontFamily: "NunitoBold",
                     color: "white",
                     textAlign: "center",
                  }}>
                  Create Account
               </Text>
               <Text
                  sx={{
                     fontSize: 15,
                     fontFamily: "NunitoBold",
                     color: "$lightGray",
                     paddingHorizontal: 16,
                     textAlign: "center",
                  }}>
                  Sign up to start your discgolf journey
               </Text>
            </View>

            {/* Form */}
            <View sx={{ position: "relative", bottom: 100 }}>
               {/* Email */}
               <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                     <>
                        <TextInput
                           placeholder="Email"
                           placeholderTextColor="#576f59"
                           style={{
                              backgroundColor: "#293728",
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
                           placeholderTextColor="#576f59"
                           secureTextEntry
                           style={{
                              backgroundColor: "#293728",
                              borderColor: errors.password ? "red" : "#293728",
                              borderRadius: 10,
                              padding: 12,
                              borderWidth: 1,
                              marginBottom: 14,
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

               {/* Confirm Password */}
               <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                     <>
                        <TextInput
                           placeholder="Confirm Password"
                           placeholderTextColor="#576f59"
                           secureTextEntry
                           style={{
                              backgroundColor: "#293728",
                              borderColor: errors.confirmPassword
                                 ? "red"
                                 : "#293728",
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
                        {errors.confirmPassword && (
                           <Text sx={{ color: "red", mb: 2 }}>
                              {errors.confirmPassword.message}
                           </Text>
                        )}
                     </>
                  )}
               />

               {/* Username */}
               <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, onBlur, value } }) => (
                     <>
                        <TextInput
                           placeholder="Username"
                           placeholderTextColor="#576f59"
                           style={{
                              backgroundColor: "#293728",
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
                           keyboardType="default"
                           autoCapitalize="none"
                        />
                        {errors.username && (
                           <Text sx={{ color: "red", mb: 2 }}>
                              {errors.username.message}
                           </Text>
                        )}
                     </>
                  )}
               />

               {/* Register Button */}
               <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  style={{
                     backgroundColor: "#17cf17",
                     padding: 14,
                     borderRadius: 8,
                     alignItems: "center",
                     marginTop: 26,
                  }}>
                  <Text
                     sx={{
                        color: "$darkGreen",
                        fontSize: 16,
                        fontWeight: "bold",
                     }}>
                     Register
                  </Text>
               </TouchableOpacity>

               {/* Link to Login */}
               <Text
                  sx={{
                     color: "$mattGreen",
                     fontSize: 14,
                     mt: 14,
                     textAlign: "center",
                  }}>
                  Already have an account?{" "}
                  <Text
                     onPress={() => router.push("/login")}
                     sx={{
                        fontFamily: "NunitoBold",
                        color: "$lightGreen",
                        fontSize: 14,
                     }}>
                     Log In
                  </Text>
               </Text>
            </View>
         </View>
      </View>
   );
}
