import { z } from "zod";

const baseSchema = z.object({
  firstName: z.string().max(255).min(1, "First name is required"),
  lastName: z.string().max(255).min(1, "Last name is required"),

  email: z
    .string()
    .refine((val) => val === "" || /\S+@\S+\.\S+/.test(val), {
      message: "Please enter a valid email",
    })
    .optional(),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => val.length >= 10, {
      message: "Phone number must be at least 10 digits",
    }),

  areaOfConcernIds: z
    .array(z.string().min(1, "Each area of concern is required"))
    .min(1, "At least one area of concern must be selected"),

  dob: z.string().nullable().optional(),
  gender: z.enum(["male", "female", "other"]).nullable().optional(),
  description: z.string().max(500).optional(),
});

export const getPatientSchema = (role: "super-admin" | "clinic" | "admin") => {
  if (role === "super-admin") {
    return baseSchema
      .extend({
        clinicId: z.string().min(1, "Clinic is required for admins"),
      });
  }

  return baseSchema;
};


export type PatientFormData = z.infer<ReturnType<typeof getPatientSchema>>;
