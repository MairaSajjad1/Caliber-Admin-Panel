import { RiderT } from "../_types";
import { PencilIcon } from "lucide-react";
import { ActionIcon } from "@/components/ui/action-icon";
import { Tooltip } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import React from "react";

interface EditRiderProps {
  rider: RiderT;
}

const EditRider = ({ rider }: EditRiderProps) => {
  const router = useRouter();
  const handleEditRiderClick = () => {
    router.push(`/contact/riders/createRider?id=${rider.id}`); // Navigate to CreateUser page with user ID as query parameter
  };

  return (
    <Tooltip
      size="sm"
      content={() => "Edit Rider"}
      placement="top"
      color="invert"
    >
      <ActionIcon
        tag="span"
        size="sm"
        variant="outline"
        className="hover:!border-gray-900 cursor-pointer hover:text-gray-700"
        onClick={handleEditRiderClick}
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};

export default EditRider;
