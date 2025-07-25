import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { categoryInterface } from "@/interface/category.interface";
import { appRoutes } from "@/lib/routes";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, FileSearch, Trash2 } from "lucide-react";
import Link from "next/link";

export const CategoryListTableHeading = (
  { 
    onDelete , 
    onEdit
  }
  : {
     onDelete: (id: string) => void 
     onEdit : (value : categoryInterface) => void
    }) : ColumnDef<any>[] => [
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
    header: "SN",
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
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Description
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.original?.description ?? "-"}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const handleDelete = () => {
        if (confirm("Are you sure you want to delete this clinic?")) {
          console.log("Delete clinic with ID:", row.original?.id);
        }
      };

      return (
        <div className="space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={appRoutes.CLINIC_INDIVIDUAL_PAGE.replace(":id", row.original?.id)}>
                  <Button variant="ghost" className="!px-2 cursor-pointer text-yellow-500">
                    <FileSearch />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>View Detail</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                  <Button variant="ghost" className="!px-2 cursor-pointer text-green-500" onClick={(e) => onEdit({
                    name : row.original.name , 
                    description : row?.original?.description , 
                    id : row?.original?.id
                  })}>
                    <Edit />
                  </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Detail</TooltipContent>
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
