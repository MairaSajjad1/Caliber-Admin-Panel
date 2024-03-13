import { DataTable } from "@/components/table/data-table";
import { PurchaseT } from "../_types";
import AddPurchase from "./add-brand";
import { columns } from "./columns";

interface PurchaseTableProps {
purchases : PurchaseT[];
}

const PurchaseTable = ({ purchases }: PurchaseTableProps) => {
  return (
    <div>
      <DataTable
        heading="Purchases"
        filterKey={"name"}
        data={purchases}
        columns={columns}
      >
        <AddPurchase />
      </DataTable>
    </div>
  );
};

export default PurchaseTable;
