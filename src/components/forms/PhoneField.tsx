"use client";
import React from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import clsx from "clsx";

interface PhoneInputFieldProps {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (value: string | undefined) => void;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    variant?: "dashboard" | "app";
    defaultCountryCode?: string | any;
    countries?: string[] | any;
    international?: boolean;
    readOnly? : boolean
}

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
    id,
    name,
    label,
    value,
    onChange,
    placeholder = "Enter phone number",
    error,
    disabled = false,
    required = false,
    className = "",
    variant = "app",
    defaultCountryCode = "US", // Default to US, you can change this
    countries, // Array of country codes to limit selection
    international = true , 
    readOnly
}) => {
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
                <PhoneInput
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    defaultCountry={defaultCountryCode}
                    countries={countries}
                    international={international}
                    className={clsx(
                        "phone-input-field",
                        error ? "phone-input-error" : "",
                        variant === "dashboard" ? "phone-input-dashboard" : "phone-input-app"
                    )}
                    readOnly={readOnly}
                />
            </div>

            {/* Error Message */}
            {error && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}

            <style jsx>{`
                
            `}</style>
        </div>
    );
};

export default PhoneInputField;