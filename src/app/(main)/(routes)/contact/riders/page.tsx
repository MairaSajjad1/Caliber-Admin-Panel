import { getAllRiders } from "./_actions";
import { RiderT } from "./_types";
import UserTable from "./_components/rider-table";

const page = async () => {
  const riders: RiderT[] = await getAllRiders();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <UserTable riders={riders} />
    </div>
  );
};

export default page;
