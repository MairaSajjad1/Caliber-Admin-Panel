import { DataTable } from "@/components/table/data-table";
import { LocationT } from "../_types";
import AddLocation from "./add-location";
import { columns } from "./columns";

interface LocationTableProps {
locations : LocationT[];
}

const LocationTable = ({ locations }: LocationTableProps) => {
  return (
    <div>
      <DataTable
        heading="Locations"
        filterKey={"name"}
        data={locations}
        columns={columns}
      >
        <AddLocation />
      </DataTable>
    </div>
  );
};

export default LocationTable;
