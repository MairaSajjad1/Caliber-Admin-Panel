import { getAllBarcodes } from "./_actions";
import { BarcodeT } from "./_types";
import BarcodeTable from "./_components/brand-table";

const page = async () => {
  const barcodes: BarcodeT[] = await getAllBarcodes();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <BarcodeTable barcodes={barcodes} />
    </div>
  );
};

export default page;
