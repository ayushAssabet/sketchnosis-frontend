"use client";
import React from "react";
import clsx from "clsx";

interface AppTextAreaProps {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    variant?: "dashboard" | "app";
    rows?: number;
    maxLength?: number;
    resize?: "none" | "both" | "horizontal" | "vertical";
}

const AppTextArea: React.FC<AppTextAreaProps> = ({
    id,
    name,
    label,
    value,
    onChange,
    placeholder,
    error,
    disabled = false,
    required = false,
    className = "",
    variant = "app",
    rows = 4,
    maxLength,
    resize = "vertical",
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
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    rows={rows}
                    maxLength={maxLength}
                    className={clsx(
                        "w-full px-3 py-3 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors",
                        error ? "border-red-500" : "border-muted-foreground",
                        variant === "dashboard" &&
                            "text-sm shadow-none rounded py-2",
                        resize === "none" && "resize-none",
                        resize === "horizontal" && "resize-x",
                        resize === "vertical" && "resize-y",
                        resize === "both" && "resize"
                    )}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                />

                {/* Character Count */}
                {maxLength && (
                    <div className="absolute bottom-2 right-2 text-sm text-gray-400">
                        {value.length}/{maxLength}
                    </div>
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

export default AppTextArea;
