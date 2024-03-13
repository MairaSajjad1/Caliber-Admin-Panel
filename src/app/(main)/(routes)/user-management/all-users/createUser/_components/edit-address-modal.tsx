import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AddUserAddressInput, userFormSchema } from "@/validators/add-user-address";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/modal/use-modal";
import { AddressT } from "../_types";
import { createAddress, editAddress } from "../../_actions";
import { useSession } from "next-auth/react";

interface EditAddressModalProps {
  user?: AddressT;
  address?: number;
}

const EditAddressModal: FC<EditAddressModalProps> = ({ user, address }) => {
  const storedData = sessionStorage.getItem("addresses");
  const addresses = storedData ? JSON.parse(storedData) : [];

  const { refresh } = useRouter();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const { token, business_id } = session?.user!;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddUserAddressInput>({
    resolver: zodResolver(userFormSchema),

    ////setting the default value if there is address(index of address object) then set that index otherwise the address is zero index because otherwise it gives undefined
    defaultValues: {
      id: address ? addresses[address]?.id : addresses[0]?.id,
      city: address ? addresses[address]?.city : addresses[0]?.city,
      country: address ? addresses[address]?.country : addresses[0]?.country,
      state: address ? addresses[address]?.state : addresses[0]?.state,
      address_line_1: address
        ? addresses[address]?.address_line_1
        : addresses[0]?.address_line_1,
      address_line_2: address
        ? addresses[address]?.address_line_2
        : addresses[0]?.address_line_2,
      zip_code: address ? addresses[address]?.zip_code : addresses[0]?.zip_code,
    },
  });

  const onSubmit = async (data: AddUserAddressInput) => {
    try {
      console.log(data, "data in module");
      setLoading((loading) => !loading);

      ////hit api if id is recievd. this shows that the user is edited and id's were assigned from backend
      if(data?.id){
      const result = await editAddress(data, data?.id, token);
      console.log(result, "result");
      }

      ////index is other than 0
      if (address) {
        addresses[address] = data;
      } else {
        //////index is zero because witing address gives undefined
        addresses[0] = data;
      }

      sessionStorage.setItem("addresses", JSON.stringify(addresses));
      refresh();
      closeModal();
    } catch (error) {
    } finally {
      setLoading((loading) => !loading);
    }
  };

  return (
    <div className="m-auto px-5 py-7 sm:p-10 space-y-2">
      <h4 className="text-center">Edit Address</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "gap-2 sm:gap-4 flex flex-grow flex-col @container [&_label.block>span]:font-medium"
        )}
      >
        <Input
          label="City"
          placeholder="City"
          {...register(`city`)}
          error={errors?.city?.message}
        />
        <Input
          label="State"
          placeholder="State"
          {...register(`state`)}
          error={errors?.state?.message}
        />
        <Input
          label="Country"
          placeholder="Country"
          {...register(`country`)}
          error={errors?.country?.message}
        />
        <Input
          label="Address Line 1"
          placeholder="Address Line 1"
          {...register(`address_line_1`)}
          error={errors?.address_line_1?.message}
        />
        <Input
          label="Address Line 2"
          placeholder="Address Line 2"
          {...register(`address_line_2`)}
          error={errors?.address_line_1?.message}
        />
        <Input
          label="Zip Code"
          placeholder="Zip Code"
          {...register(`zip_code`)}
          error={errors?.zip_code?.message}
        />
        <Button
          color="primary"
          className=" shadow-button "
          type="submit"
          isLoading={loading}
        >
          Edit
        </Button>
      </form>
    </div>
  );
};

export default EditAddressModal;
