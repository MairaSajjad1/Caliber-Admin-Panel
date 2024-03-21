"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Tooltip } from "@/components/ui/tooltip";
import { PurchaseData } from "../_types";
import dynamic from "next/dynamic";

export const columns: ColumnDef<PurchaseData>[] = [
  {
    accessorKey: "purchase_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="purchase_no" />
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
    accessorKey: "payment_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="payment_status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex  pl-2 items-center">
          {row.getValue("payment_status")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "final_total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="final_total" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center pl-2 capitalize">
          {row.getValue("final_total")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

];
