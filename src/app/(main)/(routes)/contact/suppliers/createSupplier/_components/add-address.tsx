"use client";
import { useModal } from "@/components/modal/use-modal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { FC } from "react";

interface AddAddressModalProps {
  supplierId?: number| undefined;
}

const AddAddressModal = dynamic(() => import("./add-address-modal"), {
  ssr: false,
});

const AddAddress: FC<AddAddressModalProps> = ({supplierId}) => {
  const { openModal } = useModal();

  return (
    <Button
      color="primary"
      onClick={() => {
        openModal({
          view: <AddAddressModal userId={supplierId}/>,
        customSize: "500px",
        });
      }}
      className={cn("h-auto  w-fit  shadow-button ")}
    >
      Add Address
    </Button>
  );
};

export default AddAddress;
