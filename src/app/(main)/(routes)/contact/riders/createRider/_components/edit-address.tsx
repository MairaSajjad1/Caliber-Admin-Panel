import { useRouter } from 'next/navigation';
import { PencilIcon } from 'lucide-react';
import { ActionIcon } from '@/components/ui/action-icon';
import { Tooltip } from '@/components/ui/tooltip';
import { AddressT} from "../_types";
import { useModal } from "@/components/modal/use-modal";
import dynamic from "next/dynamic";
import { RiderT} from "../../_types";

interface EditRiderProps {
  address?: number;
}
const EditAddressModal = dynamic(
  () => import("./edit-address-modal"),
  {
    ssr: false,
  }
);

const EditAddress = ({ address }: EditRiderProps) => {
  const { openModal } = useModal();
  return (
    <Tooltip
      size="sm"
      content={() => "Edit Address"}
      placement="top"
      color="invert"
    >
      <ActionIcon
        tag="span"
        size="sm"
        variant="outline"
        className="hover:!border-gray-900 cursor-pointer hover:text-gray-700"
        onClick={() => {
          openModal({
            view: <EditAddressModal address={address}/>,
            customSize: "500px",
          });
        }} 
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};

export default EditAddress;
