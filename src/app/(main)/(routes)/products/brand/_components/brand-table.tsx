import { DataTable } from "@/components/table/data-table";
import { BrandT } from "../_types";
import AddBrand from "./add-brand";
import { columns } from "./columns";

interface BrandTableProps {
brands : BrandT[];
}

const BrandTable = ({ brands }: BrandTableProps) => {
  return (
    <div>
      <DataTable
        heading="Brands"
        filterKey={"name"}
        data={brands}
        columns={columns}
      >
        <AddBrand />
      </DataTable>
    </div>
  );
};

export default BrandTable;
