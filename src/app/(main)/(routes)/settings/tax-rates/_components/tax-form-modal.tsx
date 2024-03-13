import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AddTaxInput, taxFormSchema } from "@/validators/add-tax";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import { createTax, editTax} from "../_actions";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/modal/use-modal";
import toast from "react-hot-toast";
import { TaxT } from "../_types";
import { Console } from "console";

interface TaxFormModalProps {
  tax?: TaxT;
}

const TaxFormModal: FC<TaxFormModalProps> = ({ tax }) => {
  const { refresh } = useRouter();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const { token, business_id } = session?.user!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTaxInput>({
    resolver: zodResolver(taxFormSchema),
    defaultValues: {
      name: tax?.name || "",
      amount: Number(tax?.amount) || 0,
      business_id : tax?.business_id || business_id,
      created_by: tax?.created_by || Number(session?.user?.customer_id),
    },
  });
  const onSubmit = async (data: AddTaxInput) => {
    console.log("Button Clicked");
   
    try {
      setLoading((loading) => !loading);
      tax
        ? await toast.promise(editTax(data, tax?.id, token), {
            loading: "Updating...",
            success: "Success",
            error: "Something Went Wrong",
          })
        : await toast.promise(createTax(data, token), {
            loading: "Adding...",
            success: "Success",
            error: "Something Went Wrong",
          });
          

      refresh();
      closeModal();
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading((loading) => !loading);
    }
  };

  const title = tax ? "Edit Tax-type" : "Add New Tax-type";
  const action = tax ? "Edit" : "Add";
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
          label="Name"
          placeholder="Name"
          {...register(`name`)}
          error={errors?.name?.message}
        />
          <Input
          label="Amount %"
          placeholder="10"
          {...register(`amount`)}
          error={errors?.amount?.message}
        />
        <Button
    color="primary"
    className="shadow-button"
    type="submit"
    isLoading={loading}
    // onClick={() => console.log('Button Clicked')}
>
    {action}
</Button>
      </form>
    </div>
  );
};

export default TaxFormModal;
