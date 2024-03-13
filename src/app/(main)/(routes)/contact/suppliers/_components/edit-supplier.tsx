import { SupplierT } from "../_types";
import { PencilIcon } from "lucide-react";
import { ActionIcon } from "@/components/ui/action-icon";
import { Tooltip } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import React from "react";

interface EditSupplierProps {
  rider: SupplierT;
}

const EditSupplier = ({ rider }: EditSupplierProps) => {
  const router = useRouter();
  const handleEditSupplierClick = () => {
    router.push(`/contact/suppliers/createSupplier?id=${rider.id}`);
  };

  return (
    <Tooltip
      size="sm"
      content={() => "Edit Supplier"}
      placement="top"
      color="invert"
    >
      <ActionIcon
        tag="span"
        size="sm"
        variant="outline"
        className="hover:!border-gray-900 cursor-pointer hover:text-gray-700"
        onClick={handleEditSupplierClick}
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};

export default EditSupplier;
