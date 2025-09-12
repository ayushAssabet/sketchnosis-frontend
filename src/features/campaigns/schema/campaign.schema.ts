import { z } from "zod";

export const campaignSchema = z
    .object({
        name: z
            .string()
            .min(1, "Campaign name is required")
            .max(100, "Name must be less than 100 characters"),
        areaOfConcernIds: z
            .array(z.string())
            .min(1, "At least one area of concern must be selected"),
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
    .passthrough()
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
    })
    .superRefine((data, ctx) => {
        console.log(data);
        const {
            repeatType,
            numberOfWeeks,
            numberOfDays,
            selectedDays,
            scheduleImages
        } : any = data;

        console.log(selectedDays, scheduleImages);

        console.log(
            parseInt(numberOfWeeks ?? "0") * selectedDays?.length !=
                scheduleImages?.length,
            numberOfWeeks,
            selectedDays,
            scheduleImages?.length
        );
        if (
            repeatType == "weekly" &&
            parseInt(numberOfWeeks ?? "0") * selectedDays?.length !=
                scheduleImages?.length
        ) {
            ctx.addIssue({
                path: ["repeatTypeDaysValidate"],
                message: "Please Select All Image to justify Number of Days",
                code: z.ZodIssueCode.custom,
            });
        } else if (
            repeatType == "daily" &&
            parseInt(numberOfDays ?? "0") != scheduleImages?.length
        ) {
            ctx.addIssue({
                path: ["repeatTypeDaysValidate"],
                message: "Please Select All Image to justify Number of Days",
                code: z.ZodIssueCode.custom,
            });
        }
    });

export type CampaignFormData = z.infer<typeof campaignSchema>;
