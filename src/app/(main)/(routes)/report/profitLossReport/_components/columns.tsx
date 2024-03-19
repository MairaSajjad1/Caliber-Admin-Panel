"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Tooltip } from "@/components/ui/tooltip";
import { OrderT } from "../_types";
import dynamic from "next/dynamic";

export const columns: ColumnDef<OrderT>[] = [
  {
    accessorKey: "unit_price_exc_tax",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit_price_exc_tax" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("unit_price_exc_tax")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "purchase_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchase_price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex  pl-2 items-center">
          {row.getValue("purchase_price")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "total_Sell",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Sell" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center pl-2 capitalize">
          {row.getValue("total_Sell")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "Loss",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loss " />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center pl-2 capitalize">
          {row.getValue("Loss")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "Profit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profit" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center pl-2 capitalize">
          {row.getValue("Profit")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
