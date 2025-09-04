import { useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Edit, FileSearch } from "lucide-react";
import DeleteButtonWithConfirmDialog from "@/components/elements/DeleteButton";
import CampaignSelector from "@/components/elements/SelectCampaignDialog";
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
import { useGetAllPermissionsByUserId } from "@/features/access/hooks/usePermissions";
import { usePatientCampaign } from "@/features/patientCampaign/usePatientCampaign";
import { hasPermission } from "@/helpers/permission.helper";
import { appRoutes } from "@/lib/routes";
import { permissions } from "@/utils/permissions";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useAuth } from "@/features/login/context/AuthContextProvider";
import { BACKEND_HOST } from "@/utils/constants";
import { useSearchParams } from "next/navigation";

export const PatientListTableHeading = ({
    onDelete,
    mutate,
}: {
    onDelete: (id: string) => void;
    mutate: () => void;
}): ColumnDef<any>[] => {
    const { data: permissionData } = useGetAllPermissionsByUserId();
    const { addPatientCampaign } = usePatientCampaign();

    const { user } = useAuth();
    const searchParams = useSearchParams()

    const isViewClinc = hasPermission(
        [permissions.VIEW_CLINIC],
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
                        {currentIndex + 1 + (searchParams.get('offSet') ? (parseInt(searchParams.get('offSet')) - 1) * 10 : 0)}
                    </div>
                );
            },
        },
        {
            accessorKey: "firstName",
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
                    <Avatar>
                        <AvatarImage
                            src={row.original?.fileUrl}
                            alt={`${
                                row.original?.firstName || "firstName"
                            } logo`}
                        />
                        <AvatarFallback className="bg-gray-300">
                            {(row.original?.firstName ?? "")
                                .split(" ")
                                .map((word: string) => word[0])
                                .join("")
                                .substring(0, 2)
                                .toUpperCase() || "CL"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="capitalize">
                        {row.original.firstName + " " + row.original.lastName}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "campaign",
            header: "campaign",
            cell: ({ row }) => {
                const campaigns = row.original?.patientCampaigns || [];

                const [open, setOpen] = useState(false);
                const [editingCampaign, setEditingCampaign] = useState<{
                    id: string;
                    startDate: string;
                } | null>(null);

                const patientId = row.original?.id;

                return (
                    <div className="flex items-center gap-2">
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

                        <CampaignSelector
                            open={open}
                            setOpen={setOpen}
                            selectedCampaign={editingCampaign?.id || null}
                            selectedStartDate={editingCampaign?.startDate || ""}
                            onCampaignSelect={async (campaign, startDate) => {
                                await addPatientCampaign(
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
                            showStartDate={true}
                            onUnassign={
                                editingCampaign
                                    ? () => {
                                          setOpen(false);
                                      }
                                    : undefined
                            }
                            isClinic={true}
                            url={
                                user?.clinicId
                                    ? `${BACKEND_HOST}/v1/clinics/campaign/${user?.clinicId}?limit=100`
                                    : undefined
                            }
                        />
                    </div>
                );
            },
        },

        ...(isViewClinc
            ? [
                  {
                      accessorKey: "clinic",
                      header: "clinic",
                      cell: ({ row }: { row: any }) => (
                          <div className="capitalize">
                              {row?.original?.clinic?.name ? (
                                  <Badge variant="secondary">
                                      {row?.original?.clinic?.name ?? "-"}
                                  </Badge>
                              ) : (
                                  "-"
                              )}
                          </div>
                      ),
                  },
              ]
            : []),

        {
            accessorKey: "areaOfConcerns",
            header: "areaOfConcerns",
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
            accessorKey: "email",
            header: "email",
            cell: ({ row }) => (
                <div className="lowercase">{row.original?.email ?? "-"}</div>
            ),
        },
        {
            accessorKey: "phone",
            header: "phone",
            cell: ({ row }) => (
                <div className="lowercase">{row.original?.phone ?? "-"}</div>
            ),
        },
        {
            accessorKey: "gender",
            header: "gender",
            cell: ({ row }) => (
                <div className="lowercase">{row.original?.gender ?? "-"}</div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            header: "Actions",
            cell: ({ row }) => {
                return (
                <div className="space-x-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={appRoutes.PATIENT_DETAIL_PAGE.replace(
                                            ":id",
                                            row.original?.id
                                        )}
                                    >
                                        <Button
                                            variant="ghost"
                                            className="!px-2 text-grey-50 text-yellow-500"
                                        >
                                            <FileSearch />
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>View Detail</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        {hasPermission(
                            [permissions.EDIT_PATIENT],
                            permissionData?.data
                        ) && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={
                                                appRoutes.PATIENT_ACTION_PAGE +
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
                        )}

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DeleteButtonWithConfirmDialog
                                        title="Delete Patient?"
                                        description={`This will permanently delete "${row.original?.firstName}".`}
                                        onConfirm={() =>
                                            onDelete(row.original?.id)
                                        }
                                    />
                                </TooltipTrigger>
                                <TooltipContent>Delete Patient</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                );
            },
        },
    ];
};
