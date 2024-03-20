import { getAllSellProduct } from "./_actions";
import { OrderT } from "./_types";
import OrderTable from "./_components/order-table";

const page = async () => {
  const orders: OrderT[] = await getAllSellProduct();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <OrderTable orders={orders} />
    </div>
  );
};

export default page;

