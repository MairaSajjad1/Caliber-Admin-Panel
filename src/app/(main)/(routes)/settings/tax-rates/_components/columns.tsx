"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import { EyeIcon } from "lucide-react";
import DeletePopover from "@/components/table/delete-popover";
import {TaxT } from "../_types";
import { deleteTax } from "../_actions";
import EditTax from "./edit-tax";
import dynamic from "next/dynamic";

export const columns: ColumnDef<TaxT>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("amount")}
          </span>
        </div>
      );
    },
  },
  {
    // accessorKey: "id",
    id: "actions",
    cell: ({ row }) => {
      const onDeleteItem = async (id: number, token: string) => {
        try {
          await deleteTax(Number(id), token);
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <div className="flex items-center justify-center gap-3">
          <EditTax tax={row.original} />
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
            title={`Delete the Tax`}
            description={`Are you sure you want to delete this Tax?`}
            onDelete={(token: string) => onDeleteItem(row.original.id, token)}
          />
        </div>
      );
    },
  },
];
