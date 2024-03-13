import { DataTable } from "@/components/table/data-table";
import { BarcodeT } from "../_types";
import AddBrand from "./add-brand";
import { columns } from "./columns";

interface BarcodeTableProps {
barcodes : BarcodeT[];
}

const BarcodeTable = ({ barcodes }: BarcodeTableProps) => {
  return (
    <div>
      <DataTable
        heading="Barcodes"
        filterKey={"name"}
        data={barcodes}
        columns={columns}
      >
        <AddBrand />
      </DataTable>
    </div>
  );
};

export default BarcodeTable;
