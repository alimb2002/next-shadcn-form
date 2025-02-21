import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(1, "password is required")
    .min(8, "password must have at least 8 characters"),
});

// Define the base schema for sign-up form
const SignUpFormSchemaBase = z.object({
  username: z.string().min(1, "User name is required").max(30),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Za-z]/, "Password must contain letters")
    .regex(/[0-9]/, "Password must contain numbers"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
});

// Frontend schema (requires confirmPassword)
export const SignUpFormSchema = SignUpFormSchemaBase.refine(
  (data) => data.password === data.confirmPassword,
  {
    path: ["confirmPassword"],
    message: "Confirm password does not match",
  }
);

// Backend schema (does not include confirmPassword)
export const signUpUserSchema = SignUpFormSchemaBase.omit({
  confirmPassword: true,
});

// password advanced validation
// .string()
//   .min(8, 'Password must be at least 8 characters long') // Minimum length of 8
//   .regex(/[A-Z]/, 'Password must contain at least one uppercase letter') // Uppercase letter
//   .regex(/[a-z]/, 'Password must contain at least one lowercase letter') // Lowercase letter
//   .regex(/[0-9]/, 'Password must contain at least one number') // Number
//   .regex(/[@$!%*?&]/, 'Password must contain at least one special character') // Special character
//   .refine((value) => value.length <= 20, 'Password must be no more than 20 characters long');
