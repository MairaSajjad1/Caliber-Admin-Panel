"use client";
import { useModal } from "@/components/modal/use-modal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';

const RiderFormModal = dynamic(() => import("../createRider/page"), {
  ssr: false,
});

const AddRider = () => {
  const { openModal } = useModal();
  const router = useRouter();

  const handleEditRiderClick = () => {
    router.push(`/contact/riders/createRider`); // Navigate to CreateUser page with user ID as query parameter
  };
  return (
    <Button
      color="primary"
      onClick={handleEditRiderClick}
      className={cn("h-auto  w-fit  shadow-button ")}
    >
      Add Rider
    </Button>
  );
};

export default AddRider;
