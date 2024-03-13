import { SubCategoryT } from "../_types";
import { PencilIcon } from "lucide-react";
import { ActionIcon } from "@/components/ui/action-icon";
import { Tooltip } from "@/components/ui/tooltip";
import { useModal } from "@/components/modal/use-modal";
import dynamic from "next/dynamic";
import React from "react";

const CategoryFormModal = dynamic(() => import("./subcategory-form-modal"), {
  ssr: false,
});

interface EditCategoryProps {
  category: SubCategoryT;
}

const EditCategory = ({ category }: EditCategoryProps) => {
  console.log(category,"category")
  const { openModal } = useModal();
  return (
    <Tooltip
      size="sm"
      content={() => "Edit Tax"}
      placement="top"
      color="invert"
    >
      <ActionIcon
        tag="span"
        size="sm"
        variant="outline"
        className="hover:!border-gray-900 cursor-pointer hover:text-gray-700"
        onClick={() => {
          openModal({
            view: <CategoryFormModal subcategory={category} />,
            customSize: "480px",
          });
        }}
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};

export default EditCategory;
