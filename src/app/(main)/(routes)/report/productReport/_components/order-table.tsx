import { DataTable } from "@/components/table/data-table";
import { OrderT } from "../_types";
import AddUser from "./export-user";
import { columns } from "./columns";

interface OrderTableProps {
  orders: OrderT[];
}

const OrderTable = ({ orders }: OrderTableProps) => {
  return (
    <div>
      <DataTable
        heading="Products Report"
        filterKey={"name"}
        data={orders}
        columns={columns}
      >
        <AddUser />
      </DataTable>
    </div>
  );
};

export default OrderTable;
