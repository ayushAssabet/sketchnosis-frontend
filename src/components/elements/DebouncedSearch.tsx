"use client";
import React, {
    useState,
    useEffect,
    useCallback,
    InputHTMLAttributes,
} from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

interface DebouncedSearchProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    mutate: () => Promise<void>;
    placeholder?: string;
    debounceMs?: number;
    minCharacters?: number;
    className?: string;
    searchKey?: string;
}

export const DebouncedSearch: React.FC<DebouncedSearchProps> = ({
    mutate,
    placeholder = "Search",
    debounceMs = 800,
    minCharacters = 1,
    className = "",
    searchKey,
    ...props
}) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    // Debounce function
    const debounce = useCallback(
        <T extends (...args: any[]) => void>(func: T, delay: number) => {
            let timeoutId: NodeJS.Timeout;
            return (...args: Parameters<T>) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func(...args), delay);
            };
        },
        []
    );

    // Handle search mutation
    const handleSearch = useCallback(
        async (term: string) => {
            if (term.trim().length < minCharacters) {
                return;
            }

            setIsLoading(true);
            try {
                const params = new URLSearchParams(searchParams);
                params.set(searchKey ?? "q", term);

                router.push(`?${params.toString()}`);

                await mutate();
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsLoading(false);
            }
        },
        [mutate, minCharacters]
    );

    // Create debounced search function
    const debouncedSearch = useCallback(debounce(handleSearch, debounceMs), [
        handleSearch,
        debounceMs,
        debounce,
    ]);

    //trigger search when searchTerm changes
    useEffect(() => {
        if (searchTerm.trim()) {
            debouncedSearch(searchTerm.trim());
        }
    }, [searchTerm, debouncedSearch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchTerm.trim()) {
            handleSearch(searchTerm.trim());
        }
    };

    const handleClearFilter = () => {
        setSearchTerm("");

        const params = new URLSearchParams(window.location.search);

        // keep only offSet and limit
        const newParams = new URLSearchParams();
        if (params.has("offSet")) {
            newParams.set("offSet", params.get("offSet") as string);
        }
        if (params.has("limit")) {
            newParams.set("limit", params.get("limit") as string);
        }

        router.push(`${window.location.pathname}?${newParams.toString()}`);
    };

    useEffect(() => {
        if (searchParams.get(searchKey)) {
            setSearchTerm(searchParams.get(searchKey));
        }
    }, []);

    return (
        <div className="flex gap-4">
            <div className={`search-field relative ${className}`}>
                <input
                    name="q"
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="bg-gray-50 border border-gray-200 pl-8 pr-1 px-2 rounded-lg min-w-[300px] text-sm min-h-9 font-poppins"
                    placeholder={placeholder}
                    disabled={isLoading}
                    {...props}
                />
                <Search
                    size={14}
                    className={`absolute top-1/2 left-3 -translate-y-1/2 ${
                        isLoading
                            ? "text-blue-500 animate-pulse"
                            : "text-gray-400"
                    }`}
                />
            </div>
            {(() => {
                const params = new URLSearchParams(searchParams.toString());

                // keep only offSet and limit
                params.delete("offSet");
                params.delete("limit");

                return params.toString() !== "";
            })() && (
                <Button className="bg-red-400" onClick={handleClearFilter}>
                    <X />
                    Clear Filter
                </Button>
            )}
        </div>
    );
};
