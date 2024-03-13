import { DataTable } from "@/components/table/data-table";
import { CategoryT } from "../_types";
import AddCategory from "./add-category";
import { columns } from "./columns";

interface CategoryTableProps {
  categories : CategoryT[];
}

const CategoryTable = ({ categories }: CategoryTableProps) => {
  return (
    <div>
      <DataTable
        heading="Categories"
        filterKey={"name"}
        data={categories}
        columns={columns}
      >
        <AddCategory />
      </DataTable>
    </div>
  );
};

export default CategoryTable;
