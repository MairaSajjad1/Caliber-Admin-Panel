import { DataTable } from "@/components/table/data-table";
import { RiderT } from "../../_types";
import { AddressT } from "../_types";
import AddAddress from "./add-address";
import { columns } from "./columns";
import { FC } from "react";
import EditAddress from "./edit-address";

interface UserTableProps {
  addresses: AddressT[];
  riderId?:number| undefined;
}

const AddressTable = ({ addresses, riderId }: UserTableProps) => {
  const address = addresses.map((item, index) => {
    return {
      ...item,
      id: index,
    };
  });
  return (
    <div>
      <DataTable
        heading="Addresses"
        filterKey={"city"}
        data={address}
        columns={columns}
      >
        <AddAddress riderId={riderId} />
      </DataTable>
    </div>
  );
};

export default AddressTable;
