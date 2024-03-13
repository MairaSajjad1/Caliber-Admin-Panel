"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Tooltip } from "@/components/ui/tooltip";
import { OrderT } from "../_types";
import dynamic from "next/dynamic";

export const columns: ColumnDef<OrderT>[] = [
  {
    accessorKey: "order_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order_no" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("order_no")}
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
        <div className="flex  pl-2 items-center">
          {row.getValue("final_total")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "order_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center pl-2 capitalize">
          {row.getValue("order_type")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "order_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Status " />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center pl-2 capitalize">
          {row.getValue("order_status")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "payment_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status " />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center pl-2 capitalize">
          {row.getValue("payment_status")}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "id",
    header: "View Details",
    cell: ({ row }) => (
      <div>
        {row?.original && (
          <a
            href={`/orders/details/${row.getValue("id")}`}
            className="text-black-500 hover:underline"
          >
            View Details
          </a>
        )}
      </div>
    ),
  },
];
