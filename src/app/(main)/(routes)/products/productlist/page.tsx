import { getAllProduct } from "./_actions";
import { ProductT } from "./_types";
import ProductTable from "./_components/product-table";

const page = async () => {
  const products: ProductT[] = await getAllProduct();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <ProductTable products={products} />
    </div>
  );
};

export default page;
