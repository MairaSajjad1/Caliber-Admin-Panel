import { DataTable } from "@/components/table/data-table";
import { VariationT } from "../_types";
import AddVariation from "./add-variation";
import { columns } from "./columns";

interface VariationTableProps {
variations : VariationT[];
}

const VariationTable = ({ variations }: VariationTableProps) => {
  return (
    <div>
      <DataTable
        heading="Variations"
        filterKey={"name"}
        data={variations}
        columns={columns}
      >
        <AddVariation />
      </DataTable>
    </div>
  );
};

export default VariationTable;
