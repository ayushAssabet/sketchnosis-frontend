import React from "react";
import { FileText, Eye } from "lucide-react";
import clsx from "clsx";

interface StatusDropdownProps {
    currentStatus: boolean;
    onChange: (status: boolean) => void;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    error?: string;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
    currentStatus,
    onChange,
    disabled = false,
    label,
    required = false,
    error
}) => {
    const statusOptions = [
        {
            value: false,
            label: "Draft",
            icon: FileText,
            description: "Only visible to editors",
            color: "text-gray-600",
            bgColor: "bg-gray-100"
        },
        {
            value: true,
            label: "Published",
            icon: Eye,
            description: "Visible to everyone",
            color: "text-green-600",
            bgColor: "bg-green-100"
        }
    ];

    return (
        <div className="relative min-w-[120px]">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            
            <select
                value={currentStatus.toString()}
                onChange={(e) => onChange(e.target.value === "true")}
                disabled={disabled}
                className={clsx(
                    "w-full bg-white border rounded-md shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
                    error ? "border-red-300" : "border-gray-300",
                    disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "hover:border-gray-400"
                )}
            >
                {statusOptions.map((option) => (
                    <option key={option.value.toString()} value={option.value.toString()}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

export default StatusDropdown;