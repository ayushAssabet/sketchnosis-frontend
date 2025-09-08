import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { appRoutes } from "@/lib/routes";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, FileSearch, Trash2 } from "lucide-react";
import Link from "next/link";
import { IllustrationAvatarWrapper } from "./IllustrationAvatarWrapper";
import { dateHelper } from "@/helpers/date.helper";
import DeleteButtonWithConfirmDialog from "@/components/elements/DeleteButton";
import { IllustrationPreviewDialog } from "./IllustrationPreviewDialog";
import StatusDropdown from "@/components/elements/ChangeStatus";
import { BACKEND_HOST } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import { useGetAllPermissionsByUserId } from "@/features/access/hooks/usePermissions";
import { hasPermission } from "@/helpers/permission.helper";
import { permissions } from "@/utils/permissions";

export const IllustrationListTableHeading = ({
    onDelete,
    changeStatus,
}: {
    onDelete: (id: string) => void;
    changeStatus: (url: string) => void;
}): ColumnDef<any>[] => {
    const searchParams = useSearchParams();

    const { data: permissionData } = useGetAllPermissionsByUserId();
    const canUpdate = hasPermission(
        [permissions.EDIT_ILLUSTRATION],
        permissionData?.data
    );
    const canDelete = hasPermission(
        [permissions.DELETE_ILLUSTRATION],
        permissionData?.data
    );
    return [
        {
            id: "select",
            header: ({ table }: { table: any }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
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
            accessorKey: "title",
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
                    <IllustrationAvatarWrapper row={row} />
                    {row.original?.title}
                </div>
            ),
        },
        {
            accessorKey: "areaOfConcerns",
            header: "Area of Concern",

            cell: ({ row }) => {
                const categories = row.original?.areaOfConcerns || [];

                if (categories.length === 0) return <div>-</div>;

                if (categories.length === 1) {
                    return (
                        <div className="lowercase">
                            <Badge>{categories[0]?.name}</Badge>
                        </div>
                    );
                }

                return (
                    <div className="lowercase">
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
                                    <Badge>{categories[0]?.name}</Badge>
                                    <Badge
                                        variant="secondary"
                                        className="text-xs"
                                    >
                                        +{categories.length - 1} more
                                    </Badge>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>All Categories</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {categories.map(
                                        (
                                            category: Record<string, any>,
                                            index: number
                                        ) => (
                                            <Badge key={index}>
                                                {category?.name}
                                            </Badge>
                                        )
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                );
            },
        },
        {
            accessorKey: "description",
            header: "description",

            cell: ({ row }) => (
                <div className="lowercase">
                    {row.original?.description == ""
                        ? "-"
                        : row.original?.description ?? "-"}
                </div>
            ),
        },
        {
            accessorKey: "isPublished",
            header: "Status",

            cell: ({ row }) => (
                <div className="capitalize">
                    {row.original?.isPublished ? (
                        <Badge variant="success">Published</Badge>
                    ) : (
                        <Badge variant="destructive">Drafted</Badge>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => (
                <div className="text-sm">
                    {row.original?.createdAt
                        ? dateHelper(row.original?.createdAt)
                        : "-"}
                </div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            header: "Actions",
            cell: ({ row }) => {
                console.log(row);
                return (
                    <div className="space-x-1 flex">
                        {canUpdate && (
                            <StatusDropdown
                                currentStatus={row?.original?.isPublished}
                                onChange={() =>
                                    changeStatus(
                                        `${BACKEND_HOST}/v1/illustration/${row?.original?.id}`
                                    )
                                }
                            />
                        )}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <IllustrationPreviewDialog row={row} />
                                    {/* </Link> */}
                                </TooltipTrigger>
                                <TooltipContent>View Detail</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {canUpdate && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={
                                                appRoutes.ILLUSTRATIONS_ACTION_PAGE +
                                                `?update=${row.original?.id}`
                                            }
                                        >
                                            <Button
                                                variant="ghost"
                                                className="!px-2 cursor-pointer text-green-500"
                                            >
                                                <Edit />
                                            </Button>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>Edit</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                        {canDelete && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <DeleteButtonWithConfirmDialog
                                            title="Delete Illustration?"
                                            description={`This will permanently delete "${row.original?.title}".`}
                                            onConfirm={() =>
                                                onDelete(row.original?.id)
                                            }
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Delete Clinic
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                );
            },
        },
    ];
};
