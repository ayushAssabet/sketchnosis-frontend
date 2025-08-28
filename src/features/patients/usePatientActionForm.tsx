import { ChangeEvent, useEffect, useState } from "react";
import { ZodError } from "zod";
import { PatientFormData, patientSchema } from "./patient.schema";

export const usePatientActionForm = (data?: PatientFormData | null) => {
  const [formData, setFormData] = useState<Partial<PatientFormData>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    areaOfConcernIds: [],
    dob: "",
    gender: null,
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, any>>({});

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, id } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [id]: id == "phone" ? value.toString() : value,
    }));
  };

  // const handleCampaignDateSelect = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { value, id } = e.currentTarget;
  //   if (id == "startDate") {
  //     setFormData((prev) => ({
  //       ...prev,
  //       campaign: [
  //         {
  //           id: prev.campaign[0]?.id || null,
  //           startDate: value || null,
  //         },
  //       ],
  //     }));
  //   }
  // };

  const validateForm = () => {
    try {
      const validated = patientSchema.parse(formData);
      console.log(validated);
      setErrors({});
      return { success: true, data: validated };
    } catch (err) {
      if (err instanceof ZodError) {
        const formatted: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) formatted[e.path[0] as string] = e.message;
        });
        setErrors(formatted);
      }
      console.log(err)
      return { success: false };
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    // handleCampaignDateSelect,
    errors,
    setErrors,
    validateForm,
  };
};
