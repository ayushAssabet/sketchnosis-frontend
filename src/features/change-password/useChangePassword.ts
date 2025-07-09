'use client'
import { useState } from "react"
import { z } from 'zod'
import { ChangePasswordFormData, changePasswordSchema } from "./changePassword.schema"

interface FormErrors {
  newPassword?: string
  confirmPassword?: string
}

export const usePassword = () => {
    const [formData, setFormData] = useState<ChangePasswordFormData>({
    newPassword: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = (name: keyof ChangePasswordFormData, value: string) => {
    try {
      changePasswordSchema.shape[name].parse(value)
      setErrors(prev => ({ ...prev, [name]: undefined }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0]?.message }))
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Validate on change
    validateField(name as keyof ChangePasswordFormData, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate entire form
      const validatedData = changePasswordSchema.parse(formData)
      
      // Clear any existing errors
      setErrors({})
      
      // TODO: Implement actual login logic here
      console.log('Login data:', validatedData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Handle successful login
      alert('Login successful!')
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {}
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormErrors] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        console.error('Login error:', error)
        alert('Login failed. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return { 
    formData, 
    setFormData, 
    errors, 
    isSubmitting, 
    handleChange, 
    handleSubmit,
    disableSubmit: (errors?.newPassword || errors?.confirmPassword || isSubmitting) ? true : false
  }
}