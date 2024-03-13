import { DataTable } from "@/components/table/data-table";
import { ProductT } from "../_types";
import AddProduct from "./add-product";
import { columns } from "./columns";

interface ProductTableProps {
products : ProductT[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  return (
    <div>
      <DataTable
        heading="Products"
        filterKey={"name"}
        data={products}
        columns={columns}
      >
        <AddProduct />
      </DataTable>
    </div>
  );
};

export default ProductTable;
