import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  AddUserAddressInput,
  userFormSchema,
} from "@/validators/add-user-address";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/modal/use-modal";
import { AddressT } from "../_types";
import { createAddress } from "../../_actions";

interface AddAddressModalProps {
  user?: AddressT;
  userId?: number | undefined;
}

const AddAddressModal: FC<AddAddressModalProps> = ({ user, userId }) => {

  /////fetching addresses stored inside session and if there is not any then intialize an empty one
  const storedData = sessionStorage.getItem("addresses");
  const addresses = storedData ? JSON.parse(storedData) : [];
  console.log(userId, "");
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
    defaultValues: {
      city: "",
      country: "",
      state: "",
      address_line_1: "",
      address_line_2: "",
      zip_code: "",
      business_id: business_id,
      user_id: userId || undefined,
    },
  });

  console.log(isValid, errors, "validity");

  const onSubmit = async (data: AddUserAddressInput) => {
    try {
      setLoading((loading) => !loading);
      console.log(data)
      
      ///if recieved userId. it means a complete user and his addreses are being edited so hit api 
      if (userId) {
        const result = await createAddress(data, token);
        console.log(result, "result");
      }

      ///it handles the case when a new user is made and there are no id's assigned
      addresses.push(data);
      sessionStorage.setItem("addresses", JSON.stringify(addresses));

      refresh();
      closeModal();
    } catch (error) {
    } finally {
      setLoading((loading) => !loading);
    }
  };

  const title = user ? "Edit Address" : "Add New Address";
  const action = user ? "Edit" : "Add";
  return (
    <div className="m-auto px-5 py-7 sm:p-10 space-y-2">
      <h4 className="text-center">{title}</h4>
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
          {action}
        </Button>
      </form>
    </div>
  );
};

export default AddAddressModal;
