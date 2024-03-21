"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Select from "@/components/ui/select";
import { FC, useEffect, useState } from "react";
import { AddProductInput, productFormSchema } from "@/validators/add-product";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct, editProduct , getSpecificProduct} from "../_actions";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ProductT } from "../_types";

interface SelectedOption {
  value: string;
}

interface Products {
  Product?: ProductT;
  searchParams: {
    id: number;
  };
  ProductId?:number | undefined;
}
const createProducts: FC<Products> = (props) => {
  const { id } = props.searchParams || {};
  const inputStyles =
    " w-full sm:w-full md:w-[48%] lg:w-[32%] my-2 mr-3 rounded-lg";
  const router = useRouter();
  const { refresh } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const [product, setProduct] = useState<ProductT>();
  const { token, business_id } = session?.user!;

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddProductInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: async () => {
      if (id) {
        const [product] = await getSpecificProduct(id, token, business_id);
        setProduct(product);
  
        return {
          name: product?.name || "",
          sku: product?.sku || "",
          type: product?.type || "",
          business_id,
        };
      } else {
        // If no id is received, set all values to empty strings
        return {
          name: "",
          sku: "",
          type: "",
          business_id,
        };
      }
    },
  });
  const onSubmit = async (data: AddProductInput) => {
    try {
      setLoading(true);
      console.log(data, "data in submit");
      product
        ? await toast.promise(editProduct(data, product?.id, token), {
            loading: "Updating...",
            success: "Success",
            error: "Something Went Wrong",
          })
        : await toast.promise(createProduct(data, token), {
            loading: "Adding...",
            success: "Success",
            error: "Something Went Wrong",
          });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const title = product ? "Edit Product" : "Add New Product";
  const action = product ? "Edit" : "Submit";
  

  return (
    <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4 ">
      <h4 className="text-center">{title}</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          " flex flex-wrap flex-row [&_label.block>span]:font-medium justify-end"
        )}
         
    
      >
        <Input
          className={inputStyles}
          label="Product Name"
          placeholder="name"
          {...register(`name`)}
          error={errors?.name?.message}
        />
        <Input
          className={inputStyles}
          label="SKU"
          placeholder="sku"
          {...register(`sku`)}
          error={errors?.sku?.message}
        />
        <Select
          className={inputStyles}
          label="Type"
          placeholder="Select type"
          id="occupation"
          error={errors?.type?.message}
          value={getValues("type")}
          onChange={(selectedOption) =>
            setValue(
              "type",
              (selectedOption as SelectedOption)?.value || ""
            )
          }
          options={[
            { value: "Single", name: "Single" },
            { value: "Variable", name: "Variable" },
            { value: "Combo", name: "Combo" },
          ]}
        />
        <div className="pr-6">

        <Button
          color="primary"
          className="col-span-3"
          type="submit"
          isLoading={loading}
          >
          {action}
        </Button>
          </div>
      </form>
    </div>
  );
}

export default createProducts
