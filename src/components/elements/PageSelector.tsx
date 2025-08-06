"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface PageSelectorProps {
    currentCount: number;
    totalCount: number;
    onCountChange: (page: number) => void;
}

const PageSelector: React.FC<PageSelectorProps> = ({
    currentCount,
    totalCount,
    onCountChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handlePageSelect = (page: number) => {
        onCountChange(page);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-flex items-center gap-2 cursor-pointer">
            <span className="text-sm">Showing </span>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex  items-center gap-2 cursor-pointer px-3 py-2 h-full text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <span className="text-gray-500">{totalCount}</span>
                <ChevronDown className="h-4 w-4" />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {Array.from({ length: 2 }, (_, i) => i + 1).map(
                        (page, i) => (
                            <button
                                key={page}
                                onClick={() => handlePageSelect(page)}
                                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                                    page === currentCount
                                        ? "bg-blue-50 text-blue-600 font-medium"
                                        : "text-gray-700"
                                }`}
                            >
                                {50 * (i + 1)}
                            </button>
                        )
                    )}
                </div>
            )}

            <span className="text-sm">entries</span>
        </div>
    );
};

export default PageSelector;
