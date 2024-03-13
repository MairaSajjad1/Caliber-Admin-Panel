import { getAllServices } from "./_actions";
import { ServiceT } from "./_types";
import ServiceTable from "./_components/service-table";

const page = async () => {
  const services: ServiceT[] = await getAllServices();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <ServiceTable services={services} />
    </div>
  );
};

export default page;
