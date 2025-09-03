import DeleteButtonWithConfirmDialog from "@/components/elements/DeleteButton";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { categoryInterface } from "@/interface/category.interface";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const CategoryListTableHeading = ({
    onDelete,
    onEdit,
}: {
    onDelete: (id: string) => void;
    onEdit: (value: categoryInterface) => void;
}): ColumnDef<any>[] => {
    const searchParams = useSearchParams();
    return [
        // {
        //   id: "select",
        //   header: ({ table }: { table: any }) => (
        //     <Checkbox
        //       checked={
        //         table.getIsAllPageRowsSelected() ||
        //         (table.getIsSomePageRowsSelected() && "indeterminate")
        //       }
        //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //       aria-label="Select all"
        //     />
        //   ),
        //   cell: ({ row }) => (
        //     <Checkbox
        //       checked={row.getIsSelected()}
        //       onCheckedChange={(value) => row.toggleSelected(!!value)}
        //       aria-label="Select row"
        //     />
        //   ),
        //   enableSorting: false,
        //   enableHiding: false,
        // },
        {
            accessorKey: "id",
            header: "S.N.",
            cell: ({ row, table }: { row: any; table: any }) => {
                const currentPageRows = table.getRowModel().rows;
                const currentIndex = currentPageRows.findIndex(
                    (r) => r.id === row.id
                );
                return (
                    <div className="capitalize" data-attr={row?.index}>
                        {currentIndex +
                            1 +
                            (searchParams.get("offSet")
                                ? (parseInt(searchParams.get("offSet")) - 1) *
                                  10
                                : 0)}
                    </div>
                );
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="text-xs uppercase !hover:bg-transparent !px-0"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="capitalize flex items-center gap-1">
                    {row.original?.name}
                </div>
            ),
        },

        {
            accessorKey: "description",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="text-xs uppercase !hover:bg-transparent !px-0"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Description
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="capitalize">
                    {row.original?.description ?? "-"}
                </div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            header: "Actions",
            cell: ({ row }) => {
                const handleDelete = () => {
                    if (
                        confirm("Are you sure you want to delete this clinic?")
                    ) {
                        console.log("Delete clinic with ID:", row.original?.id);
                    }
                };

                return (
                    <div className="space-x-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="!px-2 cursor-pointer text-green-500"
                                        onClick={(e) =>
                                            onEdit({
                                                name: row.original.name,
                                                description:
                                                    row?.original?.description,
                                                id: row?.original?.id,
                                            })
                                        }
                                    >
                                        <Edit />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Edit Category</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DeleteButtonWithConfirmDialog
                                        title="Delete Category?"
                                        description={`This will permanently delete "${row.original?.name}".`}
                                        onConfirm={() =>
                                            onDelete(row.original?.id)
                                        }
                                    />
                                </TooltipTrigger>
                                <TooltipContent>Delete Category</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                );
            },
        },
    ];
};
