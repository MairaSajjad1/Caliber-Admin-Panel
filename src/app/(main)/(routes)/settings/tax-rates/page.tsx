import { getAllTaxs } from "./_actions";
import { TaxT } from "./_types";
import TaxTable from "./_components/tax-table";

const page = async () => {
  const taxs: TaxT[] = await getAllTaxs();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <TaxTable taxs={taxs} />
    </div>
  );
};

export default page;
