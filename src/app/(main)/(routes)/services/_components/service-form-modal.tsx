import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AddServiceInput, serviceFormSchema } from "@/validators/add-service";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import { createService, editService} from "../_actions";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/modal/use-modal";
import toast from "react-hot-toast";
import { ServiceT } from "../_types";
import { Console } from "console";

interface ServiceFormModalProps {
  service?: ServiceT;
}

const ServiceFormModal: FC<ServiceFormModalProps> = ({ service }) => {
  const { refresh } = useRouter();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const { token, business_id } = session?.user!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddServiceInput>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: service?.name || "",
      description: service?.description || "",
      charge_type: service?.charge_type || "fixed",
      charge: Number(service?.charge) || 0,
      business_id : service?.business_id || business_id,
    },
  });
  const onSubmit = async (data: AddServiceInput) => {
    console.log("Button Clicked");
   
    try {
      setLoading((loading) => !loading);
      service
        ? await toast.promise(editService(data, service?.id, token), {
            loading: "Updating...",
            success: "Success",
            error: "Something Went Wrong",
          })
        : await toast.promise(createService(data, token), {
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

  const title = service ? "Edit Service" : "Add New Service";
  const action = service ? "Edit" : "Add";
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
          label="Description"
          placeholder="Description"
          {...register(`description`)}
          error={errors?.description?.message}
        />
        <Input
          label="Charge"
          placeholder="0"
          {...register(`charge`)}
          error={errors?.charge?.message}
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

export default ServiceFormModal;
