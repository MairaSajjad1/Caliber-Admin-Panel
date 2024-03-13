"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import { EyeIcon } from "lucide-react";
import DeletePopover from "@/components/table/delete-popover";
import { CategoryT } from "../_types";
import { deleteCategory } from "../_actions";
import EditCategory from "./edit-tax";
import dynamic from "next/dynamic";
import Link from "next/link";

export const columns: ColumnDef<CategoryT>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row && row.original && row.original.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Subcategory",
    cell: ({ row }) => (
      <div>
        {row && row.original && (
          <Link
            href="/settings/categories/subcategories/[id]"
            as={`/settings/categories/subcategories/id=${row.original.id}`}
            className="text-black-500 hover:underline"
          >
            View Subcategory
          </Link>
        )}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const onDeleteItem = async (id: number, token: string) => {
        try {
          await deleteCategory(Number(id), token);
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <div className="flex items-center justify-center gap-3">
          <EditCategory category={row && row.original} />
          <Tooltip
            size="sm"
            content={() => "View Tax"}
            placement="top"
            color="invert"
          >
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Tooltip>
          <DeletePopover
            title="Delete the Category"
            description="Are you sure you want to delete this Category?"
            onDelete={(token: string) => onDeleteItem(row && row.original.id, token)}
          />
        </div>
      );
    },
  },
];
