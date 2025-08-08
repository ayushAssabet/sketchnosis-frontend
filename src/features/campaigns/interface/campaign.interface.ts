import { categoryInterface } from "@/interface/category.interface";

export interface Campaign {
    id: string;
    name: string;
    description?: string;
    numberOfDays: number | null;
    repeatType: "daily" | "weekly";
    numberOfWeeks?: number | null;
    areaOfConcerns: categoryInterface[];
    createdAt?: string;
    scheduleImages?: {
        id: string;
        campaignId: string;
        imageUrl: string;
        dayOfWeek? : string
    }[];
    status?: "active" | "draft";
}
