"use client";
import { useModal } from "@/components/modal/use-modal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';

const UserFormModal = dynamic(() => import("../createUser/page"), {
  ssr: false,
});

const AddUser = () => {
  const { openModal } = useModal();
  const router = useRouter();

  const handleEditUserClick = () => {
    router.push(`/user-management/all-users/createUser`); // Navigate to CreateUser page with user ID as query parameter
  };
  return (
    <Button
      color="primary"
      onClick={handleEditUserClick}
      className={cn("h-auto  w-fit  shadow-button ")}
    >
      Add Users
    </Button>
  );
};

export default AddUser;
