export const pieDataHelper = ({ ...data } : {
    activeCampaign : string,
        campaignAccepted : string,
        campaignNotAccepted : string,
        completeCampaign : string,
}) => {
    return [
        {
            name: "Completed Campaign",
            value: data?.completeCampaign,
            color: "#10b981",
        },
        { name: "Consent Accepted", value: data?.campaignAccepted, color: "#f59e0b" },
        {
            name: "Added (No Consent Yet)",
            value: data?.campaignNotAccepted,
            color: "#ef4444",
        },
        {
            name: "Active (Receiving Illustrations)",
            value: data?.activeCampaign,
            color: "#3b82f6",
        },
    ];
};


export const lineGraphHelper = (
  data: { date: string; patientCount?: number; clinicCount?: number }[],
  type: "patients" | "clinics"
 ) : any => {
  return data.map((item) => {
    const dateObj = new Date(item.date);
    const month = dateObj.toLocaleString("default", {
      month: "short",
    });
    const day = dateObj.getDate();

    return {
      month: `${month} ${day}`, // e.g. "Aug 25"
      [type]: type === "patients" ? item.patientCount : item.clinicCount,
    };
  });
};

export const transformHealthConditionData = (
  data: Array<{ campaignId: string; campaignName: string; patientCount: number }>,
  maxItems: number = 8
): Array<{ condition: string; campaigns: number }> => {
  if (!data || data.length === 0) {
    // Return empty data if no campaigns
    return [];
  }

  // Sort by patientCount descending
  const sortedData = [...data].sort((a, b) => b.patientCount - a.patientCount);
  
  // Take only the top maxItems
  const topData = sortedData.slice(0, maxItems);
  
  // Transform to the required format
  return topData.map(item => ({
    condition: item.campaignName,
    campaigns: item.patientCount
  }));
};

/**
 * Calculates appropriate Y-axis domain and ticks based on data
 * @param data Transformed health condition data
 * @returns Object with domain max and ticks array
 */
export const calculateBarChartScale = (
  data: Array<{ condition: string; campaigns: number }>
): { domainMax: number; ticks: number[] } => {
  if (!data || data.length === 0) {
    return { domainMax: 100, ticks: [0, 25, 50, 75, 100] };
  }
  
  const maxValue = Math.max(...data.map(item => item.campaigns));
  
  // Calculate a nice rounded max value for the domain
  const domainMax = Math.ceil(maxValue * 1.2);
  
  // Generate appropriate ticks
  const ticks = generateTicks(domainMax);
  
  return { domainMax, ticks };
};

/**
 * Generates appropriate ticks for Y-axis
 */
const generateTicks = (maxValue: number): number[] => {
  if (maxValue <= 0) return [0, 25, 50, 75, 100];
  
  // Determine a good step size based on the max value
  let step: number;
  
  if (maxValue <= 10) {
    step = 1;
  } else if (maxValue <= 50) {
    step = 5;
  } else if (maxValue <= 100) {
    step = 10;
  } else if (maxValue <= 500) {
    step = 50;
  } else if (maxValue <= 1000) {
    step = 100;
  } else if (maxValue <= 5000) {
    step = 500;
  } else {
    step = 1000;
  }
  
  const ticks: number[] = [];
  for (let i = 0; i <= maxValue; i += step) {
    ticks.push(i);
  }
  
  // If we have too few ticks, add more
  if (ticks.length < 4) {
    const additionalStep = step / 2;
    for (let i = additionalStep; i < maxValue; i += additionalStep) {
      if (!ticks.includes(i)) {
        ticks.push(i);
      }
    }
    ticks.sort((a, b) => a - b);
  }
  
  return ticks;
};

