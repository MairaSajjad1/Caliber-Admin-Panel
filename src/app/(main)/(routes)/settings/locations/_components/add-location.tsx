"use client";
import { useModal } from "@/components/modal/use-modal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const LoactionFormModal = dynamic(() => import("./location-form-modal"), {
  ssr: false,
});

const AddLocation = () => {
  const { openModal } = useModal();
  return (
    <Button
      color="primary"
      onClick={() =>
        openModal({
          view: <LoactionFormModal />,
          customSize: "480px",
        })
      }
      className={cn("h-auto  w-fit  shadow-button ")}
    >
    Add Location
    </Button>
  );
};

export default AddLocation;
