import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  AddSubCategoryInput,
  subcategoryFormSchema,
} from "@/validators/add-subcategory";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import { createSubCategory, editSubCategory } from "../_actions";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/modal/use-modal";
import toast from "react-hot-toast";
import { SubCategoryT } from "../_types";
import { Console } from "console";

interface SubCategoryFormModalProps {
  subcategory?: SubCategoryT;
  category?:SubCategoryT;
}

//Category props is for Add case to assign parentId and subcategory is for edit case to set default values in edit case
const CategoryFormModal: FC<SubCategoryFormModalProps> = ({ subcategory,category}) => {
  const { refresh } = useRouter();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const { token, business_id } = session?.user!;

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<AddSubCategoryInput>({
    resolver: zodResolver(subcategoryFormSchema),
    defaultValues: {
      name: subcategory?.name || "",
      parent_id: subcategory?.parent_id || category?.id,
      created_by: subcategory?.created_by || category?.created_by,
      business_id: subcategory?.business_id || business_id,
    },
  });
console.log(category,"cat in form")
  console.log(subcategory, "subcat in form");
  console.log(errors, isValid, "valid status");

  const onSubmit = async (data: AddSubCategoryInput) => {
    console.log("Button Clicked");

    try {
      setLoading(true); // set loading to true directly
      const promise = subcategory
        ? editSubCategory(data, subcategory.id, token)
        : createSubCategory(data, token);
      await toast.promise(promise, {
        loading: ` ${subcategory ? "Updating" : "Adding"}...`,
        success: "Success",
        error: "Something Went Wrong",
      });

      refresh();
      closeModal();
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false); // set loading to false when finished
    }
  };

  const title = subcategory ? "Edit SubCategory" : "Add New SubCategory";
  const action = subcategory ? "Edit" : "Add";
  return (
    <div className="m-auto px-5 py-7 sm:p-10 space-y-2">
      <h4 className="text-center">{title}</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "gap-2 sm:gap-4 flex flex-grow flex-col @container [&_label.block>span]:font-medium"
        )}
      >
        <Input
          label="Name"
          placeholder="Name"
          {...register(`name`)}
          error={errors?.name?.message}
        />
        <Button
          color="primary"
          className="shadow-button"
          type="submit"
          isLoading={loading}
        >
          {action}
        </Button>
      </form>
    </div>
  );
};

export default CategoryFormModal;
