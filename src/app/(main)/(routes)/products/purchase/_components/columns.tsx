"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import { EyeIcon } from "lucide-react";
import DeletePopover from "@/components/table/delete-popover";
import {PurchaseT } from "../_types";
import { deletePurchase } from "../_actions";
import dynamic from "next/dynamic";

export const columns: ColumnDef<PurchaseT>[] = [
  {
    accessorKey: "purchase_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchase_no" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("purchase_no")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "purchase_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchase_date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("purchase_date")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "final_total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Final_Total" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("final_total")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "payment_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment_Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("payment_status")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "purchase_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchase_Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("purchase_status")}
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
          await deletePurchase(Number(id), token);
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <div className="flex items-center justify-center gap-3">
          {/* <EditBrand brand={row.original} /> */}
          <Tooltip
            size="sm"
            content={() => "View Purchase"}
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
            title={`Delete the Purchase`}
            description={`Are you sure you want to delete this Purchase?`}
            onDelete={(token: string) => onDeleteItem(row.original.id, token)}
          />
        </div>
      );
    },
  },
];
