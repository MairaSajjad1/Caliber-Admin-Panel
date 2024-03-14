"use client";
import { useModal } from "@/components/modal/use-modal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';


const PurchaseFormModal = dynamic(() => import("../createPurchase/page"), {
  ssr: false,
});

const AddPurchase = () => {

  const router = useRouter();

  const handleEditPurchaseClick = () => {
    router.push(`/products/purchase/createPurchase`); // Navigate to CreateUser page with user ID as query parameter
  };
  return (
    <Button
      color="primary"
      onClick={handleEditPurchaseClick}
      className={cn("h-auto  w-fit  shadow-button ")}
    >
       Add Purchase
    </Button>
  
  );
};

export default AddPurchase;
