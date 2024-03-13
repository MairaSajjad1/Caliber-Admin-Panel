import { DataTable } from "@/components/table/data-table";
import { ServiceT } from "../_types";
import AddUser from "./add-service";
import { columns } from "./columns";

interface ServiceTableProps {
  services: ServiceT[];
}

const ServiceTable = ({ services }: ServiceTableProps) => {
  return (
    <div>
      <DataTable
        heading="Service"
        filterKey={"name"}
        data={services}
        columns={columns}
      >
        <AddUser />
      </DataTable>
    </div>
  );
};

export default ServiceTable;
