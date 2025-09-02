import z from "zod";

export const illustrationSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(255),
    areaOfConcernIds: z
      .array(
        z.string().min(1, "At least one area of concern must be selected.")
      )
      .min(1, "At least one area of concern is required"),
    description: z.string().max(500).optional(),
    areaOfConcernNames: z.string().array() ,
    illustration: z
      .instanceof(File)
      .refine((file) => file.size <= 10 * 1024 * 1024, {
        message: "Logo file size must be less than 10MB",
      })
      .refine(
        (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
        {
          message: "Logo must be a JPEG, PNG, or JPG image",
        }
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.illustration) return;

    // assume you have area names accessible (you can compute before validation)
    const areaNames: string[] = data.areaOfConcernNames || [];

    if (
      areaNames.length > 0 &&
      !areaNames.some((name) =>
        data.illustration!.name.toLowerCase().includes(name.toLowerCase())
      )
    ) {
      ctx.addIssue({
        path: ["illustration"],
        message: "Image filename must include area of concern name",
        code: z.ZodIssueCode.custom,
      });
    }
  });

// Extra field for passing names during validation
export type IllustrationFormData = z.infer<typeof illustrationSchema> & {
  areaOfConcernNames?: string[];
};
