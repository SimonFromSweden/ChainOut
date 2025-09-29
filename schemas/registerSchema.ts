import { z } from "zod";

export const registerSchema = z
   .object({
      email: z.string().email("Please enter a valid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(6, "Please confirm your password"),
      username: z
         .string()
         .min(3, "Username must be at least 3 characters")
         .max(20, "Username must be at most 20 characters")
         .regex(
            /^[a-zA-Z0-9]+$/,
            "Username can only contain letters and numbers"
         ),
   })
   .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
   });

export type RegisterFormData = z.infer<typeof registerSchema>;
