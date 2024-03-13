import { getAllLocations } from "./_actions";
import { LocationT } from "./_types";
import TaxTable from "./_components/location-table";

const page = async () => {
  const locations: LocationT[] = await getAllLocations();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <TaxTable locations={locations} />
    </div>
  );
};

export default page;
