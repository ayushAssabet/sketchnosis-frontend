import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { generatePaginationLinks } from "./GeneratePages";
import { useRouter, useSearchParams } from "next/navigation";

type PaginatorProps = {
    currentPage: number;
    totalPages: number;
    showPreviousNext: boolean;
    mutate: () => void;
};

export default function Paginator({
    currentPage,
    totalPages,
    showPreviousNext,
    mutate,
}: PaginatorProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const onPageChange = (page: number): void => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set("page", page.toString());
        router.replace(`?${currentParams.toString()}`);
        mutate();
    };
    return (
        <div className="w-fit ml-auto mt-4">
            <Pagination>
                <PaginationContent>
                    {showPreviousNext && totalPages ? (
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => onPageChange(currentPage - 1)}
                                // disabled={currentPage - 1 < 1}
                                className="cursor-pointer"
                            />
                        </PaginationItem>
                    ) : null}
                    {generatePaginationLinks(
                        currentPage,
                        totalPages,
                        onPageChange
                    )}
                    {showPreviousNext && totalPages ? (
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => onPageChange(currentPage + 1)}
                                // disabled={currentPage > totalPages - 1}
                                className="cursor-pointer"
                            />
                        </PaginationItem>
                    ) : null}
                </PaginationContent>
            </Pagination>
        </div>
    );
}
