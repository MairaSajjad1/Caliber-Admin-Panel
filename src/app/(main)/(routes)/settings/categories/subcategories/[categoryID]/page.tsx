import { getAllSubCategories } from "./_actions";
import { SubCategoryT } from "./_types";
import CategoryTable from "./_components/subcategory-table";

const page = async (props: any) => {
  const { categoryID } = props?.params;
  // console.log(categoryID, "categoryID");
  const categoryId = parseInt(
    decodeURIComponent(categoryID || "").match(/\d+/)?.[0] ?? "",
    10
  );
  const subcategories: SubCategoryT[] = await getAllSubCategories(categoryId);

  ////FINDING RELEVANT OBJ IN REPONSE
  const category = subcategories.find((item) => item.id === categoryId);
  // console.log(category, "category");
  const subCategory = category?.sub_category || [];

  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <CategoryTable categories={subCategory} category={category} />
    </div>
  );
};

export default page;