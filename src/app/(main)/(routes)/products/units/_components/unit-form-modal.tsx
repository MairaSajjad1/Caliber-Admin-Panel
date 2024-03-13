import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AddUnitInput, unitFormSchema } from "@/validators/add-unit";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import { createUnit, editUnit} from "../_actions";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/modal/use-modal";
import toast from "react-hot-toast";
import { UnitT } from "../_types";
import { Console } from "console";

interface UnitFormModalProps {
  unit?: UnitT;
}

const UnitFormModal: FC<UnitFormModalProps> = ({ unit }) => {
  const { refresh } = useRouter();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const { token, business_id } = session?.user!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUnitInput>({
    resolver: zodResolver(unitFormSchema),
    defaultValues: {
      actual_name: unit?.actual_name || "",
      short_name: unit?.short_name || "",
      allow_decimal: unit?.allow_decimal || 0,
      business_id : unit?.business_id || business_id,
    },
  });
  const onSubmit = async (data: AddUnitInput) => {
    console.log("Button Clicked");
   
    try {
      setLoading((loading) => !loading);
      unit
        ? await toast.promise(editUnit(data, unit?.id, token), {
            loading: "Updating...",
            success: "Success",
            error: "Something Went Wrong",
          })
        : await toast.promise(createUnit(data, token), {
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

  const title = unit ? "Edit Unit" : "Add New Unit";
  const action = unit ? "Edit" : "Add";
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
          label="Actual Name"
          placeholder="Name"
          {...register(`actual_name`)}
          error={errors?.actual_name?.message}
        />
          <Input
          label="Shorter Name"
          placeholder="Name"
          {...register(`short_name`)}
          error={errors?.short_name?.message}
        />
        <Input
          label="Decimal Allow"
          placeholder="Name"
          {...register(`allow_decimal`)}
          error={errors?.allow_decimal?.message}
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

export default UnitFormModal;
