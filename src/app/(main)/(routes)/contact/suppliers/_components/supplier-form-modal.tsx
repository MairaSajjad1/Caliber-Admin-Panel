import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AddRiderInput, riderFormSchema } from "@/validators/add-rider";
import { cn } from "@/lib/utils";
import { Input, Password } from "@/components/ui/input";
import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import { createSupplier, editSupplier } from "../_actions";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/modal/use-modal";
import toast from "react-hot-toast";
import { SupplierT } from "../_types";

interface RiderFormModalProps {
  rider?: SupplierT;
}

const RiderFormModal: FC<RiderFormModalProps> = ({ rider }) => {
  const { refresh } = useRouter();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const { token, business_id } = session?.user!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddRiderInput>({
    resolver: zodResolver(riderFormSchema),
    defaultValues: {
      phoneNumber: rider?.mobile_no || "",
      password: "",
      business_id,
    },
  });

  const onSubmit = async (data: AddRiderInput) => {
    try {
      setLoading((loading) => !loading);
      rider
        ? await toast.promise(editSupplier(data, rider?.id, token), {
            loading: "Updating...",
            success: "Success",
            error: "Something Went Wrong",
          })
        : await toast.promise(createSupplier(data, token), {
            loading: "Adding...",
            success: "Success",
            error: "Something Went Wrong",
          });
          

      refresh();
      closeModal();
    } catch (error) {
    } finally {
      setLoading((loading) => !loading);
    }
  };

  const title = rider ? "Edit Rider" : "Add New Rider";
  const action = rider ? "Edit" : "Add";
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
          label="Phone Number"
          placeholder="Phone Number"
          {...register(`phoneNumber`)}
          error={errors?.phoneNumber?.message}
        />
        <Password
          label="Password"
          placeholder="Password"
          {...register(`password`)}
          error={errors?.password?.message}
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

export default RiderFormModal;
