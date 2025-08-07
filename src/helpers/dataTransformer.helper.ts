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
        const numberOfWeeks = formData.numberOfWeeks;
        const daysPerWeek = selectedDays.length;
        campaignData.numberOfWeeks = numberOfWeeks;

        // Create a mapping for day keys to day numbers within a week
        const dayKeyToNumber = {
            Sun: "Sun",
            Mon: "Mon",
            Tue: "Tue",
            Wed: "Wed",
            Thu: "Thu",
            Fri: "Fri",
            Sat: "Sat",
        };

        // Transform weekly images to scheduleImages format
        const scheduleImages = [];
        Object.entries(weeklyImages)
            .filter(([key, image]) => image !== null)
            .forEach(([key, image]) => {
                // Parse key like "week1_M" or "week2_T2"
                const match = key.match(/week(\d+)_(.+)/);
                if (match) {
                    console.log(match);
                    const weekNumber = parseInt(match[1]);
                    const dayKey = match[2];
                    const dayOfWeek = dayKeyToNumber[dayKey];

                    // Calculate absolute day number
                    const dayNumber = (weekNumber - 1) * 7 + dayOfWeek + 1;

                    scheduleImages.push({
                        weekNumber: weekNumber,
                        dayOfWeek: dayOfWeek,
                        illustrationId: `${image?.id}`,
                    });
                }
            });

        campaignData.scheduleImages = scheduleImages.sort(
            (a, b) => a.dayNumber - b.dayNumber
        );
    }

    return campaignData;
};
