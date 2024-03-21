"use client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Tooltip } from "@/components/ui/tooltip";
import { ReportData } from "../_types";
import dynamic from "next/dynamic";

export const columns: ColumnDef<ReportData>[] = [
  {
    accessorKey: "unit_price_before_discount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="unit_price_before_discount" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("unit_price_before_discount")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "total_Sell",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="total_Sell" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex  pl-2 items-center">
          {row.getValue("total_Sell")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "line_discount_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="line_discount_amount " />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center pl-2 capitalize">
          {row.getValue("line_discount_amount")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
