import { getAllSupplier } from "./_actions";
import { SupplierT } from "./_types";
import UserTable from "./_components/supplier-table";

const page = async () => {
  const suppliers: SupplierT[] = await getAllSupplier();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <UserTable suppliers={suppliers} />
    </div>
  );
};

export default page;
