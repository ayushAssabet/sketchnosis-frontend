import React, { useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronDown, Loader2 } from "lucide-react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/elements/TableSkeleton";
import { CheckedState } from "@radix-ui/react-checkbox";

// Debounce hook
const useDebounce = (callback: Function, delay: number) => {
    const timeoutRef = useRef<NodeJS.Timeout>(null);

    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return useCallback(
        (...args: any[]) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );
};

interface DataTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    searchKey?: string;
    showCheckbox?: boolean;
    actionDropdown?: any;
    sn?: number;
    customFilter?: React.ReactNode;
    mutate?: () => void;
    isLoading?: boolean;
}

export function DataTable<TData>({
    data,
    columns: userColumns,
    searchKey,
    showCheckbox = false,
    actionDropdown,
    customFilter,
    mutate,
    isLoading = false,
}: DataTableProps<TData>) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [localFilter, setLocalFilter] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [rowSelection, setRowSelection] = useState({});

    // Debounced handlers with loading state
    const debouncedUpdateURL = useDebounce(async (value: string) => {
        try {
            setIsSearching(true);
            const currentParams = new URLSearchParams(searchParams.toString());
            currentParams.set("name", value);
            router.replace(`?${currentParams.toString()}`);
            await mutate?.();
        } finally {
            setIsSearching(false);
        }
    }, 500);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLocalFilter(value);

        if (searchKey) {
            table.getColumn(searchKey)?.setFilterValue(value);
        }

        debouncedUpdateURL(value);
    };

    const finalColumns: ColumnDef<TData>[] = React.useMemo(() => {
        let cols: ColumnDef<TData>[] = [];

        if (showCheckbox) {
            cols.push({
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            ((table.getIsSomePageRowsSelected() &&
                                "indeterminate") as unknown as CheckedState)
                        }
                        onCheckedChange={(value) =>
                            table.toggleAllPageRowsSelected(!!value)
                        }
                        aria-label="Select all"
                        disabled={isLoading}
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        disabled={isLoading}
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            });
        }

        cols = [...cols, ...userColumns];

        if (actionDropdown) {
            cols.push(actionDropdown);
        }

        return cols;
    }, [userColumns, showCheckbox, actionDropdown, isLoading]);

    const table = useReactTable({
        data,
        columns: finalColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <div className="flex gap-2">
                    {searchKey && (
                        <div className="relative">
                            <Input
                                placeholder={`Filter ${searchKey}...`}
                                value={localFilter}
                                onChange={handleFilterChange}
                                className="max-w-sm"
                                disabled={isLoading}
                            />
                            {(isLoading || isSearching) && (
                                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                </div>
                            )}
                        </div>
                    )}
                    {customFilter}
                </div>
                {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto" disabled={isLoading}>
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu> */}
            </div>
            <div className="rounded-md">
                <Table className="custom-scrollbar">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableSkeleton
                                columns={finalColumns?.length}
                                rows={5}
                            />
                        ) : data && table?.getRowModel()?.rows?.length ? (
                            table?.getRowModel()?.rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={finalColumns?.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default DataTable;
