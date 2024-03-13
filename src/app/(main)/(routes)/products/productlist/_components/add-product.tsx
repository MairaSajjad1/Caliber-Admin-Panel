"use client";
import { useModal } from "@/components/modal/use-modal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// const BrandFormModal = dynamic(() => import("./brand-form-modal"), {
//   ssr: false,
// });

const AddProduct = () => {
  const { openModal } = useModal();
  return (
    <Button
      color="primary"
      className={cn("h-auto  w-fit  shadow-button ")}
    >
     Add Product
    </Button>
  );
};

export default AddProduct;
