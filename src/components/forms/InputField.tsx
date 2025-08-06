"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

interface InputFieldProps {
    id: string;
    name: string;
    label: string;
    type: "text" | "email" | "password" | "number" | "date" | "tel";
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    showPasswordToggle?: boolean;
    required?: boolean;
    className?: string;
    variant?: "dashboard" | "app";
    min?: string;
    max?: string;
}

const AppInputField: React.FC<InputFieldProps> = ({
    id,
    name,
    label,
    type,
    value,
    onChange,
    placeholder,
    error,
    disabled = false,
    showPasswordToggle = false,
    required = false,
    className = "",
    variant = "app",
    min,
    max,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    // Determine actual input type
    const inputType = type === "password" && showPassword ? "text" : type;

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`form-field ${className}`}>
            <label
                htmlFor={id}
                className="block text-medium font-medium text-gray-700"
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="relative mt-2">
                <input
                    type={inputType}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={clsx(
                        "w-full px-3 py-3 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors",
                        error ? "border-red-500" : "border-muted-foreground",
                        variant === "dashboard" && "h-10 shadow-none !rounded",
                        showPasswordToggle && "pr-10",
                        "text-sm"
                    )}
                    placeholder={placeholder}
                    disabled={disabled}
                    min={min}
                    max={max}
                />

                {/* Password Toggle Button */}
                {showPasswordToggle && type === "password" && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                        disabled={disabled}
                        aria-label={
                            showPassword ? "Hide password" : "Show password"
                        }
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

export default AppInputField;
