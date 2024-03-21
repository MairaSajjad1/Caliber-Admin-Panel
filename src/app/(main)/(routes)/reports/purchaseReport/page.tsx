import { getAllSellProduct } from "./_actions";
import { PurchaseData } from "./_types";
import OrderTable from "./_components/order-table";

const page = async () => {
  const supplier_id = 200;
  const orders: PurchaseData[] = await getAllSellProduct(supplier_id);
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <OrderTable orders={orders} />
    </div>
  );
};

export default page;

