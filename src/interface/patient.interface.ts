export interface PatientInterface {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    areaOfConcernIds: string[];
    dob: string;
    gender: "male" | "female" | "other";
    campaignId: string;
    campaignStartDate: string;
    description?: string;
    profile?: File;
}
  