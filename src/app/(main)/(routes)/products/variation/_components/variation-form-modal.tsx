import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { useSession } from "next-auth/react";
import {
  AddVariationInput,
  variationFormSchema,
} from "@/validators/add-variation";
import { createVariation, editVariation } from "../_actions";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/modal/use-modal";
import toast from "react-hot-toast";
import { VariationT } from "../_types";

interface VariationFormModalProps {
  variation?: VariationT;
}

const VariationFormModal: FC<VariationFormModalProps> = ({ variation }) => {
  const { refresh } = useRouter();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const [variation_templates, setVariation_templates] = useState(
    variation?.variation_template || [{ tem_name: "" }]
  );
  const { token, business_id, customer_id } = session?.user!;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<AddVariationInput>({
    resolver: zodResolver(variationFormSchema),
    defaultValues: {
      name: variation?.name || "",
      variation_templates: (variation?.variation_template || []).map(
        (template) => ({
          tem_name: template.tem_name || "",
        })
      ),
      business_id: variation?.business_id || business_id,
      created_by: variation?.created_by || customer_id,
    },
  });

  // console.log(variation, "variation");

  const handleAddTemplate = () => {
    const newTemplates = [...variation_templates, { tem_name: "" }];
    // console.log(newTemplates, "newTemplates");
    setVariation_templates(newTemplates);
    setValue("variation_templates", newTemplates);
  };

  ///////////
  const handleRemoveTemplate = (index: number) => {
    const newTemplates = variation_templates.filter((_, i) => i !== index);
    // console.log(newTemplates, "newTemplates");
    setVariation_templates(newTemplates);
    setValue("variation_templates", newTemplates);
  };

  ////////////
  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedTemplates = [...variation_templates];
    updatedTemplates[index] = { ...updatedTemplates[index], [field]: value };
    // console.log(updatedTemplates, "updatedTemplates");
    setVariation_templates(updatedTemplates);
    setValue("variation_templates", updatedTemplates);
  };

  const onSubmit = async (data: AddVariationInput) => {
    try {
      setLoading(true);
      console.log(data, "data ");
      variation
        ? await toast.promise(editVariation(data, variation?.id, token), {
            loading: "Updating...",
            success: "Success",
            error: "Something Went Wrong",
          })
        : await toast.promise(createVariation(data, token), {
            loading: "Adding...",
            success: "Success",
            error: "Something Went Wrong",
          });

      refresh();
      closeModal();
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const title = variation ? "Edit Variation" : "Add New Variation";
  const action = variation ? "Edit" : "Add";

  return (
    <div className="m-auto px-5 py-7 sm:p-10 space-y-2">
      <h4 className="text-center">{title}</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-2 sm:gap-4 flex flex-grow flex-col @container [&_label.block>span]:font-medium"
      >
        <Input
          label="Name"
          placeholder="Name"
          {...register("name")}
          error={errors?.name?.message}
        />
        <div>
          <div>Variation Templates</div>
          {variation_templates?.map((template, index) => (
            <div key={index} className="flex items-center gap-4 w-full">
              <div className="flex-1">
                <Input
                  label={`Template ${index + 1}`}
                  placeholder={`Template ${index + 1}`}
                  {...register(
                    `variation_templates.${index}.tem_name` as const,
                    {
                      onChange: (e) =>
                        handleInputChange(index, "tem_name", e.target.value),
                    }
                  )}
                />
              </div>
              {index > 0 && !variation ? (
                <Button
                  className="mt-2"
                  onClick={() => handleRemoveTemplate(index)}
                >
                  Remove
                </Button>
              ) : null}
            </div>
          ))}
        </div>
        {!variation && (
          <Button
            color="primary"
            className="shadow-button"
            type="button"
            onClick={handleAddTemplate}
          >
            Add Template
          </Button>
        )}
        <Button
          color="primary"
          className="shadow-button"
          type="submit"
          isLoading={loading}
        >
          {action}
        </Button>
      </form>
    </div>
  );
};

export default VariationFormModal;
