import { DataTable } from "@/components/table/data-table";
import { RiderT } from "../_types";
import AddRider from "./add-rider";
import { columns } from "./columns";

interface RiderTableProps {
  riders: RiderT[];
}

const RiderTable = ({ riders }: RiderTableProps) => {
  return (
    <div>
      <DataTable
        heading="Riders"
        filterKey={"mobile_no"}
        data={riders}
        columns={columns}
      >
        <AddRider />
      </DataTable>
    </div>
  );
};

export default RiderTable;
