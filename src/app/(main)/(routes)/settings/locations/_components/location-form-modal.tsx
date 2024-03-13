import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AddLocationInput, locationFormSchema } from "@/validators/add-location";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import { createLocation} from "../_actions";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/modal/use-modal";
import toast from "react-hot-toast";
import { LocationT } from "../_types";
import { Console } from "console";

interface LocationModalProps {
  location?: LocationT;
}

const LocationModal: FC<LocationModalProps> = ({ location }) => {
  const { refresh } = useRouter();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const { token, business_id } = session?.user!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddLocationInput>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      name: location?.name || "",
      landmark : location?.landmark || "",
      city: location?.city || "",
      state: location?.state || "",
      country: location?.country || "",
      business_id : location?.business_id || business_id,
    },
  });
  const onSubmit = async (data: AddLocationInput) => {
    console.log("Button Clicked");
   
    try {
      setLoading((loading) => !loading);
      // location
      //   ? await toast.promise(editTax(data, location?.id, token), {
      //       loading: "Updating...",
      //       success: "Success",
      //       error: "Something Went Wrong",
      //     })
      //   :
         await toast.promise(createLocation(data, token), {
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

  const title = location ? "Edit Location" : "Add New Location";
  const action = location ? "Edit" : "Add";
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
          label="Landmark"
          placeholder="Landmark"
          {...register(`landmark`)}
          error={errors?.name?.message}
        />
        <Input
          label="City"
          placeholder="City"
          {...register(`city`)}
          error={errors?.name?.message}
        />
        <Input
          label="State"
          placeholder="State"
          {...register(`state`)}
          error={errors?.name?.message}
        />
         <Input
          label="Country"
          placeholder="Country"
          {...register(`country`)}
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

export default LocationModal;
