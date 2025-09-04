import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, FileSearch, Trash2 } from "lucide-react";
import Link from "next/link";
import { ClinicAvatarWrapper } from "./ClinicAvatarWrapper";
import DeleteButtonWithConfirmDialog from "@/components/elements/DeleteButton";
import { useState } from "react";
import CampaignSelector from "@/components/elements/SelectCampaignDialog";
import { useClinicCampaign } from "@/features/clinicCampaign/useClinicCampaign";
import { useSearchParams } from "next/navigation";
import { BACKEND_HOST } from "@/utils/constants";

export const ClinicListTableHeading = ({
    onDelete,
    mutate,
}: {
    onDelete: (id: string) => void;
    mutate: () => Promise<void>;
}): ColumnDef<any>[] => {
    const { addClinicCampaign } = useClinicCampaign(mutate);
    const searchParams = useSearchParams();
    return [
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
                <div className="lowercase flex items-center gap-1">
                    <ClinicAvatarWrapper row={row} />
                    {row.original?.name}
                </div>
            ),
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="text-xs uppercase !hover:bg-transparent !px-0"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="lowercase">{row.original?.email ?? "-"}</div>
            ),
        },
        {
            accessorKey: "areaOfConcerns",
            header: "Area of Concerns",
            cell: ({ row }) => {
                const categories = row.original?.areaOfConcerns || [];

                type badge =
                    | "default"
                    | "secondary"
                    | "destructive"
                    | "outline";

                // Badge variants array
                const badgeVariants: badge[] = [
                    "default",
                    "secondary",
                    "destructive",
                    "outline",
                ];

                // Function to get random variant
                const getRandomVariant = () => {
                    return badgeVariants[
                        Math.floor(Math.random() * badgeVariants.length)
                    ];
                };

                if (categories.length === 0) return <div>-</div>;

                if (categories.length === 1) {
                    return (
                        <div className="lowercase">
                            <Badge variant={getRandomVariant()}>
                                {categories[0]?.name}
                            </Badge>
                        </div>
                    );
                }

                return (
                    <div className="lowercase">
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
                                    <Badge variant={getRandomVariant()}>
                                        {categories[0]?.name}
                                    </Badge>
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
                                            <Badge
                                                key={index}
                                                variant={getRandomVariant()}
                                            >
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
            accessorKey: "campaign",
            header: "Campaign",
            cell: ({ row }) => {
                const campaigns = row.original?.clinicCampaigns || [];

                const [open, setOpen] = useState(false);
                const [editingCampaign, setEditingCampaign] = useState<{
                    id: string;
                    startDate: string;
                } | null>(null);

                const patientId = row.original?.id;

                return (
                    <div className="flex items-center gap-2">
                        {/* Existing badges display */}
                        {campaigns.length === 0 ? (
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => {
                                    setEditingCampaign(null);
                                    setOpen(true);
                                }}
                            >
                                + Assign Campaign
                            </Button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">
                                    {campaigns[0]?.campaign?.name ?? "-"}
                                </Badge>
                                {campaigns.length > 1 && (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Badge
                                                variant="secondary"
                                                className="cursor-pointer text-xs"
                                            >
                                                +{campaigns.length - 1} more
                                            </Badge>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    All Campaigns
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {campaigns.map(
                                                    (
                                                        campaign: Record<
                                                            string,
                                                            any
                                                        >,
                                                        index: number
                                                    ) => (
                                                        <Badge
                                                            key={index}
                                                            variant="secondary"
                                                        >
                                                            {campaign?.campaign
                                                                ?.name ?? "-"}
                                                        </Badge>
                                                    )
                                                )}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                        )}

                        {/* Trigger button to open CampaignSelector */}

                        {/* Campaign selector dialog */}
                        <CampaignSelector
                            open={open}
                            setOpen={setOpen}
                            selectedCampaign={editingCampaign?.id || null}
                            selectedStartDate={editingCampaign?.startDate || ""}
                            onCampaignSelect={async (campaign, startDate) => {
                                await addClinicCampaign(
                                    [
                                        {
                                            id: campaign?.id,
                                            startDate: startDate,
                                        },
                                    ],
                                    patientId
                                );
                                mutate();
                                setOpen(false);
                            }}
                            isClinic
                            showStartDate={false}
                            onUnassign={
                                editingCampaign
                                    ? () => {
                                          console.log(
                                              "Unassigning",
                                              editingCampaign?.id
                                          );
                                          setOpen(false);
                                      }
                                    : undefined
                            }
                            url={`${BACKEND_HOST}/v1/campaign?limit=100`}
                        />
                    </div>
                );
            },
        },
        {
            accessorKey: "contactPersonName",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="text-xs uppercase !hover:bg-transparent !px-0"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Contact Person&apos;s Name
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="capitalize">
                    {row.original?.contactPersonName ?? "-"}
                </div>
            ),
        },
        {
            accessorKey: "phone",
            header: "Contact Number",
            cell: ({ row }) => (
                <div className="lowercase">{row.original?.phone ?? "-"}</div>
            ),
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    className="text-xs uppercase !hover:bg-transparent !px-0"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Status
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="lowercase flex items-center gap-1">
                    {row.original?.status === "active" ? (
                        <Badge variant="success">{row?.original?.status}</Badge>
                    ) : (
                        <Badge variant="pending">{row?.original?.status}</Badge>
                    )}
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
                        // 🔥 Call your deleteClinic function here
                        console.log("Delete clinic with ID:", row.original?.id);
                    }
                };

                return (
                    <div className="space-x-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={appRoutes.CLINIC_INDIVIDUAL_PAGE.replace(
                                            ":id",
                                            row.original?.id
                                        )}
                                    >
                                        <Button
                                            variant="ghost"
                                            className="!px-2  text-grey-50"
                                        >
                                            <FileSearch className="text-yellow-500" />
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>View Detail</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={
                                            appRoutes.CLINIC_ACTION_PAGE +
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
                                <TooltipContent>Edit Detail</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DeleteButtonWithConfirmDialog
                                        title="Delete Clinic?"
                                        description={`This will permanently delete "${row.original?.name}".`}
                                        onConfirm={() =>
                                            onDelete(row.original?.id)
                                        }
                                    />
                                </TooltipTrigger>
                                <TooltipContent>Delete Clinic</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                );
            },
        },
    ];
};
