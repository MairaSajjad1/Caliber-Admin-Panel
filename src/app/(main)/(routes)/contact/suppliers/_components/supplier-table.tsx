import { DataTable } from "@/components/table/data-table";
import { SupplierT } from "../_types";
import AddSupplier from "./add-supplier";
import { columns } from "./columns";

interface SupplierTableProps {
  suppliers: SupplierT[];
}

const RiderTable = ({ suppliers }: SupplierTableProps) => {
  return (
    <div>
      <DataTable
        heading="Supplier"
        filterKey={"mobile_no"}
        data={suppliers}
        columns={columns}
      >
        <AddSupplier />
      </DataTable>
    </div>
  );
};

export default RiderTable;
