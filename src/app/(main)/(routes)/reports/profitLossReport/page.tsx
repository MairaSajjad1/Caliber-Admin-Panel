import { getAllOrders } from "./_actions";
import { ReportData } from "./_types";
import OrderTable from "./_components/order-table";

const page = async () => {
  const orders: ReportData[] = await getAllOrders();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <OrderTable orders={orders} />
    </div>
  );
};

export default page;

