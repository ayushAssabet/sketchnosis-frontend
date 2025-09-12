import { useCallback, useState } from "react";
import { z, ZodError } from "zod";

// Schema
const emailSchema = z.string().email("Invalid email address");

export const useRoleUserForm = (onSubmit: (user: { email: string }) => void, onClose: () => void) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting , setIsSubmitting] = useState(false)

  const validateEmail = useCallback((value: string) => {
    try {
      emailSchema.parse(value);
      setError("");
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message);
      }
      return false;
    }
  }, []);

  const handleChange = useCallback((value: string) => {
    setEmail(value);
    if (error) validateEmail(value); // revalidate on change
  }, [error, validateEmail]);

  const handleSubmit = useCallback(async(e) => {
    e.preventDefault();
    setIsSubmitting(true)
    if (validateEmail(email)) {
      await onSubmit({ email });
      setIsSubmitting(false)
      resetForm();
      onClose();
    }
  }, [email, validateEmail, onSubmit, onClose]);

  const handleCancel = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose]);

  const resetForm = useCallback(() => {
    setEmail("");
    setError("");
  }, []);

  return {
    email,
    error,
    handleChange,
    handleSubmit,
    handleCancel,
    resetForm,
    isSubmitting
  };
};
