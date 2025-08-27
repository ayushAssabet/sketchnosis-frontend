export interface ClinicInterface {
    id: string;
    title: string;
    description?: string;
    areaOfConcerns?: Array<string>;
}

export interface ClinicIndividualInterface {
    id: string;
    name: string;
    description?: string;
    areaOfConcerns?: Array<Record<string, any>>;
    address?: string;
    contactPersonName: string;
    email?: string;
    logoUrl?: string;
    phone?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}
