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
import { viewImage } from "@/helpers/viewImage.helper";
import { appRoutes } from "@/lib/routes";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, FileSearch, Trash2 } from "lucide-react";
import Link from "next/link";
import { IllustrationAvatarWrapper } from "./IllustrationAvatarWrapper";
import { dateHelper } from "@/helpers/date.helper";

export const IllustrationListTableHeading = ({
  onDelete,
}: {
  onDelete: (id: string) => void;
}): ColumnDef<any>[] => [
  {
    id: "select",
    header: ({ table }: { table: any }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs uppercase !hover:bg-transparent !px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase flex items-center gap-1">
        <IllustrationAvatarWrapper row={row} />
        {row.original?.title}
      </div>
    ),
  },
  {
    accessorKey: "areaOfConcerns",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs uppercase !hover:bg-transparent !px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const categories = row.original?.areaOfConcerns || [];

      type badge = "default" | "secondary" | "destructive" | "outline";

      // Badge variants array
      const badgeVariants: badge[] = [
        "default",
        "secondary",
        "destructive",
        "outline",
      ];

      // Function to get random variant
      const getRandomVariant = () => {
        return badgeVariants[Math.floor(Math.random() * badgeVariants.length)];
      };

      if (categories.length === 0) return <div>-</div>;

      if (categories.length === 1) {
        return (
          <div className="lowercase">
            <Badge variant={getRandomVariant()}>{categories[0]?.name}</Badge>
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
                <Badge variant="secondary" className="text-xs">
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
                  (category: Record<string, any>, index: number) => (
                    <Badge key={index} variant={getRandomVariant()}>
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs uppercase !hover:bg-transparent !px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Description
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.original?.description ?? "-"}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-xs uppercase !hover:bg-transparent !px-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="uppercase">
        {row.original?.createdAt ? dateHelper(row.original?.createdAt) : "-"}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const handleDelete = () => {
        if (confirm("Are you sure you want to delete this clinic?")) {
          // 🔥 Call your deleteClinic function here
          console.log("Delete clinic with ID:", row.original?.id);
        }
      };

      return (
        <div className="space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* <Link
                                    href={appRoutes.CLINIC_INDIVIDUAL_PAGE.replace(
                                        ":id",
                                        row.original?.id
                                    )}
                                > */}
                <Button
                  variant="ghost"
                  //   className="!px-2 cursor-pointer text-yellow-500"
                  className="!px-2 cursor-not-allowed text-grey-50"
                >
                  <FileSearch />
                </Button>
                {/* </Link> */}
              </TooltipTrigger>
              <TooltipContent>View Detail</TooltipContent>
            </Tooltip>
          </TooltipProvider>

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
              <TooltipContent>Edit clinic</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="!px-2 cursor-pointer text-red-500"
                  onClick={() => onDelete(row?.original?.id)}
                >
                  <Trash2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Clinic</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
