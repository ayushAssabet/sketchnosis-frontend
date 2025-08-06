import { z } from "zod";

export const campaignSchema = z
  .object({
    name: z
      .string()
      .min(1, "Campaign name is required")
      .max(100, "Name must be less than 100 characters"),
    areaOfConcernIds: z
      .array(z.string())
      .min(1, "At least one category must be selected"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long")
      .max(500, "Description must be less than 500 characters"),
    repeatType: z.enum(["daily", "weekly"], {
      required_error: "Please select repeat frequency",
    }),
    numberOfWeeks: z.string().optional().nullable(),
    numberOfDays: z.string().optional().nullable(),
    selectedDays: z.array(z.string()).optional(),
    images: z.record(z.any()).optional(),
  })
  .superRefine((data, ctx) => {
    const { repeatType, numberOfWeeks, numberOfDays } = data;

    if (repeatType === "daily") {
      if (!numberOfDays || isNaN(Number(numberOfDays))) {
        ctx.addIssue({
          path: ["numberOfDays"],
          message: "Number of days is required for daily repeat",
          code: z.ZodIssueCode.custom,
        });
      } else {
        const val = parseInt(numberOfDays);
        if (val < 1 || val > 365) {
          ctx.addIssue({
            path: ["numberOfDays"],
            message: "Number of days must be between 1 and 365",
            code: z.ZodIssueCode.custom,
          });
        }
      }
    }

    if (repeatType === "weekly") {
      if (!numberOfWeeks || isNaN(Number(numberOfWeeks))) {
        ctx.addIssue({
          path: ["numberOfWeeks"],
          message: "Number of weeks is required for weekly repeat",
          code: z.ZodIssueCode.custom,
        });
      } else {
        const val = parseInt(numberOfWeeks);
        if (val < 1 || val > 12) {
          ctx.addIssue({
            path: ["numberOfWeeks"],
            message: "Number of weeks must be between 1 and 12",
            code: z.ZodIssueCode.custom,
          });
        }
      }
    }
  });

export type CampaignFormData = z.infer<typeof campaignSchema>;
