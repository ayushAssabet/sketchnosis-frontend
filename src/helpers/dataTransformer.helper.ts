interface campaignDataInterface {
    name: string;
    description?: string;
    repeatType: "daily" | "weekly";
    numberOfDays?: number;
    areaOfConcernIds?: string[];
    scheduleImages: {
        dayNumber: number;
        illustrationId: string;
    }[];
    numberOfWeeks?: number;
}

export const transformCampaignData = (
    formData,
    selectedDays,
    weeklyImages: Record<string, any>,
    dailyImages: Record<string, any>
) => {
    // Base campaign data structure
    const campaignData: campaignDataInterface = {
        name: formData.name,
        description: formData.description,
        repeatType: formData.repeatType, // "daily" or "weekly"
        numberOfDays: null,
        areaOfConcernIds: formData.areaOfConcernIds || [],
        scheduleImages: [],
        numberOfWeeks: null,
    };

    console.log(formData);

    // Handle daily campaigns
    if (formData.repeatType === "daily") {
        campaignData.numberOfDays = formData.numberOfDays;

        // Transform daily images to scheduleImages format
        campaignData.scheduleImages = Object.entries(dailyImages)
            .filter(([key, image]) => image !== null)
            .map(([key, image]) => {
                const dayNumber = parseInt(key.replace("day", ""));
                return {
                    dayNumber: dayNumber,
                    illustrationId: `${image?.id}`,
                };
            })
            .sort((a, b) => a.dayNumber - b.dayNumber);
    }

    // Handle weekly campaigns
    else if (formData.repeatType === "weekly") {
        campaignData.numberOfWeeks = formData.numberOfWeeks;

        // Transform weekly images to scheduleImages format
        const scheduleImages = [];
        Object.entries(weeklyImages)
            .filter(([key, image]) => image !== null)
            .forEach(([key, image]) => {
                scheduleImages.push({
                    dayOfWeek: key,
                    illustrationId: `${image?.id}`,
                });
            });

        campaignData.scheduleImages = scheduleImages.sort(
            (a, b) => a.dayNumber - b.dayNumber
        );
    }

    return campaignData;
};
