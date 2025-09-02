import React, { useState, useEffect, useRef, useContext } from "react";
import { Search, X, ChevronDown, Check, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { CategoryContext } from "@/contexts/CategoryContextProvider";
import { useCategory } from "@/features/categories/useCategory";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/login/context/AuthContextProvider";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/fetch.helper";

interface Option {
    label: string;
    value: string;
}

const AsyncSearchableDropdown: React.FC<{
    defaultOption?: Option[];
    onSelectionChange: (selected: Option[]) => void;
    error?: string;
    required?: boolean;
    url?: string;
}> = ({ defaultOption = [], onSelectionChange, error, required, url }) => {
    const { categories: contextCategories } = useContext(CategoryContext);
    const { addCategory } = useCategory();
    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] = useState<Option[]>(defaultOption);
    const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showAddOption, setShowAddOption] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const { data: externalData, isLoading: externalLoading } = useSWR(
        url ? url : null,
        defaultFetcher
    );

    const sourceCategories = url
        ? externalData?.data || []
        : contextCategories;

    const allOptions: Option[] = sourceCategories.map((category: any) => ({
        label: category.name,
        value: category.id,
    }));

    const performAsyncSearch = async (query: string) => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 300));

        const filtered = allOptions.filter((option) =>
            option.label.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredOptions(filtered);
        setShowAddOption(filtered?.length === 0 && query.trim() !== "");
        setIsLoading(false);
    };

    useEffect(() => {
        if (searchTerm) {
            performAsyncSearch(searchTerm);
        } else {
            setFilteredOptions(allOptions);
            setShowAddOption(false);
        }
    }, [searchTerm, sourceCategories]);

    useEffect(() => {
        setSelectedItems(defaultOption);
    }, [defaultOption]);

    useEffect(() => {
        onSelectionChange(selectedItems);
    }, [selectedItems]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleToggleItem = (item: Option) => {
        setSelectedItems((prev) =>
            prev.some((selected) => selected.value === item.value)
                ? prev.filter((selected) => selected.value !== item.value)
                : [...prev, item]
        );
    };

    const handleRemoveItem = (item: Option) => {
        setSelectedItems((prev) =>
            prev.filter((selected) => selected.value !== item.value)
        );
    };

    const handleClearAll = () => {
        setSelectedItems([]);
    };

    const handleAddNewCategory = async () => {
        if (searchTerm.trim()) {
            const res = await addCategory({ name: searchTerm });
            const createdOption: Option = {
                label: res?.data?.name || searchTerm,
                value: res?.data?.id || searchTerm.toLowerCase().replace(/\s+/g, "-"),
            };
            setSelectedItems((prev) => [...prev, createdOption]);
            setSearchTerm("");
            setShowAddOption(false);
        }
    };

    const loadingState = isLoading || externalLoading;

    return (
        <div className="w-full">
            <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Area of Concern
                    {required && <span className="text-red-500"> *</span>}
                </h3>

                <div className="space-y-4">
                    <div className="relative" ref={dropdownRef}>
                        <div
                            className={cn(
                                "flex items-center gap-2 px-2 py-2.5 border border-gray-300 rounded-sm cursor-pointer bg-white",
                                error && "border-red-500"
                            )}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <div className="flex flex-wrap gap-2 flex-1">
                                {selectedItems.map((item) => (
                                    <span
                                        key={item.value}
                                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                                    >
                                        {item.label}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveItem(item);
                                            }}
                                            className="hover:text-gray-900"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                                {selectedItems.length === 0 && (
                                    <span className="text-[#b2b6bd] text-sm">
                                        Select categories...
                                    </span>
                                )}
                            </div>
                            <ChevronDown
                                size={20}
                                className={`text-gray-400 transition-transform ${
                                    isOpen ? "rotate-180" : ""
                                }`}
                            />
                        </div>

                        {isOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-80 overflow-hidden">
                                <div className="p-3 border-b border-gray-200">
                                    <div className="relative">
                                        <Search
                                            size={16}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            className="w-full pl-10 pr-4 py-2 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="max-h-60 overflow-y-auto">
                                    {loadingState ? (
                                        <div className="p-4 text-center text-gray-500">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                                            <span className="mt-2 block">
                                                Searching...
                                            </span>
                                        </div>
                                    ) : (
                                        <>
                                            {filteredOptions.map((option) => (
                                                <div
                                                    key={option.value}
                                                    onClick={() =>
                                                        handleToggleItem(option)
                                                    }
                                                    className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
                                                >
                                                    <span className="text-gray-900">
                                                        {option.label}
                                                    </span>
                                                    <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center">
                                                        {selectedItems.some(
                                                            (selected) =>
                                                                selected.value ===
                                                                option.value
                                                        ) && (
                                                            <Check
                                                                size={14}
                                                                className="text-blue-600"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}

                                            {showAddOption && (
                                                <div
                                                    onClick={
                                                        handleAddNewCategory
                                                    }
                                                    className="flex items-center gap-2 p-3 hover:bg-gray-50 cursor-pointer text-blue-600"
                                                >
                                                    <Plus size={16} />
                                                    <span>
                                                        Add "{searchTerm}"
                                                    </span>
                                                </div>
                                            )}

                                            {!loadingState &&
                                                filteredOptions.length === 0 &&
                                                !showAddOption && (
                                                    <div className="p-4 text-center text-gray-500">
                                                        No options found
                                                    </div>
                                                )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                        {selectedItems?.length > 0 && (
                            <Button
                                onClick={handleClearAll}
                                variant="ghost"
                                className="absolute top-1/2 -translate-y-1/2 right-8 text-[10px]"
                            >
                                Clear All
                            </Button>
                        )}
                        {error && (
                            <p className="mt-1 text-sm text-red-600" role="alert">
                                {error}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AsyncSearchableDropdown;
