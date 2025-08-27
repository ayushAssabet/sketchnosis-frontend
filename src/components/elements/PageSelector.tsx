"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PageSelectorProps {
  currentCount?: number;
  totalCount?: number;
  mutate: () => void;
}

const PageSelector: React.FC<PageSelectorProps> = ({ mutate }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // get currently selected limit or default to 10
  const currentLimit = searchParams.get("limit") || "10";

  const handlePageSelect = (limit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", String(limit));
    router.push(`${pathname}?${params.toString()}`);
    mutate();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-flex items-center gap-2 cursor-pointer">
      <span className="text-sm">Showing</span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer px-3 py-2 h-full text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <span className="text-gray-500">{currentLimit}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {[10, 50, 100].map((limit) => (
            <button
              key={limit}
              onClick={() => handlePageSelect(limit)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                currentLimit === String(limit) ? "bg-gray-100 font-medium" : "text-gray-700"
              }`}
            >
              {limit}
            </button>
          ))}
        </div>
      )}

      <span className="text-sm">entries</span>
    </div>
  );
};

export default PageSelector;
