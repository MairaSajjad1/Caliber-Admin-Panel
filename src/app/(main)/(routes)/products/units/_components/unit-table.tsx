import { DataTable } from "@/components/table/data-table";
import { UnitT } from "../_types";
import AddBrand from "./add-unit";
import { columns } from "./columns";

interface UnitTableProps {
units : UnitT[];
}

const UnitTable = ({ units }: UnitTableProps) => {
  return (
    <div>
      <DataTable
        heading="Units"
        filterKey={"name"}
        data={units}
        columns={columns}
      >
        <AddBrand />
      </DataTable>
    </div>
  );
};

export default UnitTable;
