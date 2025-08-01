import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().optional(),
});
export type ContactFormData = z.infer<typeof contactFormSchema>;

export const applyFormSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  nationality: z.string().min(2, "Nationality must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  country: z.string().min(3, "Country must be at least 3 characters"),
  course: z.string().min(3, "Course must be at least 3 characters"),
  university: z.string().min(1, "University is required"),
  budget: z.string().min(3, "Budget must be at least 3 characters"),
  qualification: z
    .string()
    .min(3, "Qualification must be at least 3 characters"),
  message: z.string().optional(),
});

export type ApplyFormData = z.infer<typeof applyFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export const forgotPasswordFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type forgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

export const registerFormSchema = z
  .object({
    firstName: z.string().min(2, "First Name must be at least 2 characters"),
    lastName: z.string().min(2, "Last Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerFormSchema>;

export const resetPasswordFormSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;
