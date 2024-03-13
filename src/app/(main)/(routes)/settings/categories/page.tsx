import { getAllSubCategories } from "./_actions";
import { CategoryT } from "./_types";
import CategoryTable from "./_components/category-table";

const page = async () => {
  const categories: CategoryT[] = await getAllSubCategories();
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <CategoryTable categories={categories} />
    </div>
  );
};

export default page;
