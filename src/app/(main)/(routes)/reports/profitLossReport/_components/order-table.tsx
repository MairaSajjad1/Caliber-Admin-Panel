import { DataTable } from "@/components/table/data-table";
import { ReportData } from "../_types";
import AddUser from "./export-user";
import { columns } from "./columns";

interface OrderTableProps {
  orders: ReportData[];
}

const OrderTable = ({ orders }: OrderTableProps) => {
  return (
    <div>
      <DataTable
        heading="Profit-Loss Report"
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
