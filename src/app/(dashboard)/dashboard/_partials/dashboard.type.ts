export interface CampaignData {
  total: number;
  published: number;
  draft: number;
}

export interface ClinicStats {
  total: number;
  active: number;
  draft: number;
}

export interface ClinicsGrowth {
  date: string; // could also be Date if you parse it
  clinicCount: number;
}

export interface IllustrationData {
  total: number;
}

export interface PatientCampaignStats {
  completeCampaign: number;
  campaignAccepted: number;
  campaignNotAccepted: number;
  activeCampaign: number;
}

export interface PatientCountByCampaign {
  campaignId: string;
  campaignName: string;
  patientCount: number;
}

export interface PatientData {
  total: number;
}

export interface PatientsGrowth {
  date: string; // or Date
  patientCount: number;
}

export interface DashboardResponse {
  campaignData: CampaignData;
  clinicStats: ClinicStats;
  clinicsGrowthOverTime: ClinicsGrowth[];
  illustrationData: IllustrationData;
  patientCampaignStats: PatientCampaignStats;
  patientCountByCampaign: PatientCountByCampaign[];
  patientData: PatientData;
  patientsGrowthOverTime: PatientsGrowth[];
  smsSuccessRate: number;
  todaysScheduledCampaign: number;
}
