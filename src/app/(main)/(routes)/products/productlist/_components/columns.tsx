"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import { EyeIcon } from "lucide-react";
import DeletePopover from "@/components/table/delete-popover";
import {ProductT } from "../_types";
import { deleteProduct} from "../_actions";
import EditProduct from "./edit-product";
import dynamic from "next/dynamic";

export const columns: ColumnDef<ProductT>[] = [
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
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "product_stock",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Product_Stock" />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex pl-2">
  //         <span className="max-w-[500px] capitalize truncate font-medium">
  //           {row.getValue("product_stock")}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex pl-2">
          <span className="max-w-[500px] capitalize truncate font-medium">
            {row.getValue("type")}
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
          await deleteProduct(Number(id), token);
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <div className="flex items-center justify-center gap-3">
          <EditProduct product={row.original} />
          <Tooltip
            size="sm"
            content={() => "View Product"}
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
            title={`Delete the Product`}
            description={`Are you sure you want to delete this Product?`}
            onDelete={(token: string) => onDeleteItem(row.original.id, token)}
          />
        </div>
      );
    },
  },
];
