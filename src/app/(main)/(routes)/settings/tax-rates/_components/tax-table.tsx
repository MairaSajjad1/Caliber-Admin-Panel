import { DataTable } from "@/components/table/data-table";
import { TaxT } from "../_types";
import AddTax from "./add-tax";
import { columns } from "./columns";

interface TaxTableProps {
taxs : TaxT[];
}

const TaxTable = ({ taxs }: TaxTableProps) => {
  return (
    <div>
      <DataTable
        heading="Taxes"
        filterKey={"name"}
        data={taxs}
        columns={columns}
      >
        <AddTax />
      </DataTable>
    </div>
  );
};

export default TaxTable;
