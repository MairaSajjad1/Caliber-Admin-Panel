"use client";
import { useModal } from "@/components/modal/use-modal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';

const SupplierFormModal = dynamic(() => import("../createSupplier/page"), {
  ssr: false,
});

const AddSupplier = () => {
  const { openModal } = useModal();
  const router = useRouter();

  const handleEditSupplierClick = () => {
    router.push(`/contact/suppliers/createSupplier`); // Navigate to CreateUser page with user ID as query parameter
  };
  return (
    <Button
      color="primary"
      onClick={handleEditSupplierClick}
      className={cn("h-auto  w-fit  shadow-button ")}
    >
      Add Supplier
    </Button>
  );
};

export default AddSupplier;
