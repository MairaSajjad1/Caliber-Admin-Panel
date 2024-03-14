import { getAllPurchase } from "./_actions";
import { PurchaseT } from "./_types";
import BrandTable from "./_components/purchase-table";

const page = async () => {
  const purchases: PurchaseT[] = await getAllPurchase();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <BrandTable purchases={purchases} />
    </div>
  );
};

export default page;
