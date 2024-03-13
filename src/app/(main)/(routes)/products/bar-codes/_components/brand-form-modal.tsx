import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AddBarcodeInput, barcodeFormSchema } from "@/validators/add-barcode";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import { createBarcode, editBarcode} from "../_actions";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/modal/use-modal";
import toast from "react-hot-toast";
import { BarcodeT } from "../_types";
import { Console } from "console";

interface BarcodeFormModalProps {
  barcode?: BarcodeT;
}

const BarcodeFormModal: FC<BarcodeFormModalProps> = ({ barcode }) => {
  const { refresh } = useRouter();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const { token, business_id } = session?.user!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBarcodeInput>({
    resolver: zodResolver(barcodeFormSchema),
    defaultValues: {
      name: barcode?.name || "",
      created_by: barcode?.created_by || Number(session?.user?.customer_id),
      business_id : barcode?.business_id || business_id,
    },
  });
  const onSubmit = async (data: AddBarcodeInput) => {
    console.log("Button Clicked");
   
    try {
      setLoading((loading) => !loading);
      barcode
        ? await toast.promise(editBarcode(data, barcode?.id, token), {
            loading: "Updating...",
            success: "Success",
            error: "Something Went Wrong",
          })
        : await toast.promise(createBarcode(data, token), {
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

  const title = barcode ? "Edit Barcode" : "Add New Barcode";
  const action = barcode ? "Edit" : "Add";
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

export default BarcodeFormModal;
