import { DataTable } from "@/components/table/data-table";
import { SubCategoryT } from "../_types";
import AddCategory from "./add-subcategory";
import { columns } from "./columns";

interface CategoryTableProps {
  categories : SubCategoryT[];
  category ?: SubCategoryT;
}

const CategoryTable = ({ categories,category }: CategoryTableProps) => {
  console.log("inside")
  return (
    <div>
      <DataTable
        heading="SubCategories"
        filterKey={"name"}
        data={categories}
        columns={columns}
      >
        <AddCategory category={category}/>
      </DataTable>
    </div>
  );
};

export default CategoryTable;
