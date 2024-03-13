import { getAllVariations } from "./_actions";
import { VariationT } from "./_types";
import BrandTable from "./_components/variation-table";

const page = async () => {
  const variations: VariationT[] = await getAllVariations();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <BrandTable variations={variations} />
    </div>
  );
};
export default page;
