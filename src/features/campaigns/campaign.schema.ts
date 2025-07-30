import { z } from "zod";

export const campaignSchema = z.object({
    name: z.string().min(1, "Campaign name is required").max(100, "Name must be less than 100 characters"),
    areaOfConcernIds: z.array(z.string()).min(1, "At least one category must be selected"),
    description: z.string().min(10, "Description must be at least 10 characters long").max(500, "Description must be less than 500 characters"),
    repeat: z.enum(['daily', 'weekly'], {
        required_error: "Please select repeat frequency"
    }),
    numberOfWeeks: z.string().optional().refine((val) => {
        if (!val) return true;
        const num = parseInt(val);
        return num >= 1 && num <= 12;
    }, "Number of weeks must be between 1 and 12"),
    numberOfDays: z.string().optional().refine((val) => {
        if (!val) return true;
        const num = parseInt(val);
        return num >= 1 && num <= 365;
    }, "Number of days must be between 1 and 365"),
    selectedDays: z.array(z.string()).optional(),
    images: z.record(z.any()).optional()
}).refine((data) => {
    // Validate based on repeat type
    if (data.repeat === 'weekly') {
        return data.numberOfWeeks && parseInt(data.numberOfWeeks) > 0;
    } else if (data.repeat === 'daily') {
        return data.numberOfDays && parseInt(data.numberOfDays) > 0;
    }
    return true;
}, {
    message: "Please specify the duration for the selected repeat type",
    path: ["numberOfWeeks"] // This will show error on numberOfWeeks field, but you can customize
});

export type CampaignFormData = z.infer<typeof campaignSchema>;