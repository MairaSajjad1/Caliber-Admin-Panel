"use client";
import { useModal } from "@/components/modal/use-modal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const BrandFormModal = dynamic(() => import("./brand-form-modal"), {
  ssr: false,
});

const AddBrand = () => {
  const { openModal } = useModal();
  return (
    <Button
      color="primary"
      onClick={() =>
        openModal({
          view: <BrandFormModal />,
          customSize: "480px",
        })
      }
      className={cn("h-auto  w-fit  shadow-button ")}
    >
      Add Brand
    </Button>
  );
};

export default AddBrand;
