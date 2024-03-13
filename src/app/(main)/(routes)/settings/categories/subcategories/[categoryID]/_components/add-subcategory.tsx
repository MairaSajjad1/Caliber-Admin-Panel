"use client";
import { useModal } from "@/components/modal/use-modal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { SubCategoryT } from "../_types";

const CategoryFormModal = dynamic(() => import("./subcategory-form-modal"), {
  ssr: false,
});

interface CategoryTableProps {
  category ?: SubCategoryT;
}

const AddSubCategory = ({category}: CategoryTableProps) => {
  const { openModal } = useModal();
  return (
    <Button
      color="primary"
      onClick={() =>
        openModal({
          view: <CategoryFormModal category={category}/>,
          customSize: "480px",
        })
      }
      className={cn("h-auto  w-fit  shadow-button ")}
    >
      Add SubCategory
    </Button>
  );
};

export default AddSubCategory;
