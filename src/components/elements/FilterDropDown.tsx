import React, { useState } from "react";
import { ChevronDown, Sliders } from "lucide-react";
import { Button } from "../ui/button";
import { useGetCategoriesList } from "@/features/categories/useGetCategories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mutate } from "swr";

interface Category {
    id: string;
    name: string;
}

interface FilterDropdownProps {
    categories?: Category[];
    onApplyFilters?: (selectedCategories: string[]) => void;
    onClearAll?: () => void;
    mutate?: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
    onApplyFilters,
    onClearAll,
    mutate,
}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { data } = useGetCategoriesList();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const toggleCategory = (categoryId: string): void => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((item) => item !== categoryId)
                : [...prev, categoryId]
        );
    };

    const clearAll = (): void => {
        setSelectedCategories([]);
        onClearAll?.();
    };

    const applyFilters = (): void => {
        const params = new URLSearchParams(searchParams.toString());
        selectedCategories.forEach((category) => {
            params.append("areaOfConcerns", category);
        });
        router.replace(`${pathname}?${params?.toString()}`);
        onApplyFilters?.(selectedCategories);
        mutate?.();
        setIsOpen(false);
    };

    const handleOutsideClick = (): void => {
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block">
            {/* Filter Button */}

            <Button
                variant={"outline"}
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
                className="cursor-pointer text-sm"
            >
                <Sliders size={16} className="text-gray-600" />
                <span className="text-gray-700 font-medium">Filter</span>
                <ChevronDown
                    size={16}
                    className={`text-gray-600 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </Button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full -left-[200%] mt-2 w-80 px-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {/* Header */}
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">
                            By Category
                        </h3>
                        <Button
                            variant={"ghost"}
                            onClick={clearAll}
                            className="font-normal text-xs cursor-pointer"
                        >
                            Clear all
                        </Button>
                    </div>

                    {/* Categories List */}
                    <div className="py-2 space-y-1 h-[30vh] overflow-y-auto">
                        {data?.data?.map((category) => {
                            const isSelected = selectedCategories.includes(
                                category.id
                            );

                            return (
                                <label
                                    key={category.id}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors text-xs"
                                >
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() =>
                                            toggleCategory(category.id)
                                        }
                                        className="w-4 h-4"
                                        //   className="sr-only"
                                    />
                                    <span className="text-gray-700 text-sm">
                                        {category.name}
                                    </span>
                                </label>
                            );
                        })}
                    </div>

                    {/* Apply Button */}
                    <div className="py-2 border-t border-gray-200 w-full flex justify-end">
                        <Button
                            className="text-xs w-fit cursor-pointer"
                            onClick={applyFilters}
                        >
                            Apply Filters
                        </Button>
                    </div>
                </div>
            )}

            {/* Overlay to close dropdown when clicking outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={handleOutsideClick}
                />
            )}
        </div>
    );
};

export default FilterDropdown;
