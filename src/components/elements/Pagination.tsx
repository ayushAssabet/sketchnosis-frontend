"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    // Generate page numbers
    const generatePageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1);
                pages.push("...");
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push("...");
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex w-fit">
            <Button
                variant="outline"
                className="flex items-center gap-1 text-sm rounded-none px-2.5 py-1.5 border-[#F0F0F0] cursor-pointer font-normal"
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage <= 1}
            >
                <ArrowLeft className="h-4 w-4" /> Previous
            </Button>

            <div className="flex">
                {generatePageNumbers().map((page, index) => (
                    <Button
                        key={index}
                        variant={page === currentPage ? "default" : "outline"}
                        className={` p-0 ${
                            page === currentPage
                                ? "bg-primary text-white hover:bg-primary/90 border-blue-200"
                                : "text-gray-600"
                        } ${
                            page === "..." ? "cursor-default" : ""
                        } rounded-none px-2.5 py-1.5 border-[#F0F0F0] cursor-pointer font-normal`}
                        onClick={() =>
                            typeof page === "number" && onPageChange(page)
                        }
                        disabled={page === "..."}
                    >
                        {page}
                    </Button>
                ))}
            </div>

            <Button
                variant="outline"
                className="flex items-center gap-1 text-sm rounded-none px-2.5 py-1.5 border-[#F0F0F0] cursor-pointer font-normal"
                onClick={() =>
                    onPageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage == totalPages}
            >
                Next <ArrowRight className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default Pagination;
