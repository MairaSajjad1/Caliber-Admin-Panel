import { getAllBrands } from "./_actions";
import { BrandT } from "./_types";
import BrandTable from "./_components/brand-table";

const page = async () => {
  const brands: BrandT[] = await getAllBrands();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <BrandTable brands={brands} />
    </div>
  );
};

export default page;
