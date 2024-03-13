import { getAllUnits } from "./_actions";
import { UnitT } from "./_types";
import BrandTable from "./_components/unit-table";

const page = async () => {
  const units: UnitT[] = await getAllUnits();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <BrandTable units={units} />
    </div>
  );
};

export default page;
