"use client";
import { useModal } from "@/components/modal/use-modal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const AddUser = () => {
  const { openModal } = useModal();
  return (
    <Button
      color="primary"
      className={cn("h-auto  w-fit  shadow-button ")}
    >
     Export Orders
    </Button>
  );
};

export default AddUser;
