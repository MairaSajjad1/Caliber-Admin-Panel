"use client";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddPurchaseInput,
  purchaseFormSchema,
} from "@/validators/add-purchase";
import { cn } from "@/lib/utils";
import { Input, Password } from "@/components/ui/input";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import SelectBox from "@/components/ui/select";
import { FC, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  getAllProduct,
  getAllVariations,
  getAllSupplier,
  getAllLocations,
  getAllTaxs,
  createPurchase,
  editPurchase,
  getAllPurchases,
} from "../_actions";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/modal/use-modal";
import toast from "react-hot-toast";
import { PurchaseT } from "../_types";

type Products = {
  id: number;
  name: string;
};
type ProductB = {
  id: number;
  contact: { f_name: string };
};

// interface PurchaseLine {
//   product_id: number | undefined;
//   product_variation_id: number | undefined;
//   quantity: number | undefined;
// }

interface SelectOptionsA {
  name: string;
  label: string;
  value: number;
}

interface SelectOptionsB {
  name: string;
  label: string;
  value: string;
}

interface UserFormModalProps {
  purchase?: PurchaseT;
  searchParams: {
    id: number;
  };
  userId?: number | undefined;
}

const UserFormModal: FC<UserFormModalProps> = (props) => {
  // console.log("props", props);
  const { id } = props.searchParams || {};
  const inputStyles =
    " w-full sm:w-full md:w-[48%] lg:w-[32%] my-2 mr-3 rounded-lg";
  const discountOptions = [
    { name: "fixed", value: "fixed", label: "Fixed" },
    { name: "percentage", value: "percentage", label: "Percentage" },
  ];
  const typeOptions = [
    { name: "opening_stock", value: "opening_stock", label: "Open Stock" },
    { name: "closed_Stock", value: "closed_Stock", label: "Closed Stock" },
  ];
  const purchaseOptions = [
    { name: "pending", value: "pending", label: "Pending" },
    { name: "done", value: "done", label: "Done" },
  ];
  const paymentOptions = [
    { name: "pending", value: "pending", label: "Pending" },
    { name: "done", value: "done", label: "Done" },
  ];
  const sourceOptions = [
    { name: "web", value: "web", label: "Web" },
    { name: "app", value: "app", label: "App" },
  ];
  const payment2Options = [
    { name: "cash", value: "cash", label: "Cash" },
    { name: "card", value: "card", label: "Card" },
  ];
  const [purchase, setPurchase] = useState<PurchaseT>();
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const [variations, setVariations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [tax, setTax] = useState([]);
  const [tax_amount, setTax_amount] = useState(
    purchase?.tax_amount !== undefined ? purchase.tax_amount : 0
  );
  const [discount_amount, setDiscount_amount] = useState(
    purchase?.discount_amount !== undefined ? purchase.discount_amount : 0
  );

  const [purchase_lines, setPurchase_lines] = useState(
    purchase?.purchase_lines || [
      {
        product_id: 0,
        product_variation_id: 0,
        quantity: 0,
        discount_amount:0
      },
    ]
  );
  const { refresh } = useRouter();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const { token, business_id } = session?.user!;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid, errors },
  } = useForm<AddPurchaseInput>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: async () => {
      if (id) {
        const [purchase] = await getAllPurchases(token, business_id,id);
        // console.log(purchase,"purchase inside default")
        setPurchase(purchase);

        return {
          id: purchase?.id || undefined,
          business_id: business_id,
          location_id: purchase?.location_id || undefined,
          supplier_id: purchase?.supplier_id || undefined,
          type: purchase?.type || "",
          purchase_status: purchase?.purchase_status || "",
          payment_status: purchase?.payment_status || "",
          purchase_date: purchase?.purchase_date || "",
          tax_rate_id: purchase?.tax_rate_id || undefined,
          tax_amount: purchase?.tax_amount || undefined,
          source: purchase?.source || "",
          discount_type: purchase?.discount_type || "",
          discount_amount: purchase?.discount_amount || undefined,
          created_by: purchase?.business_id || business_id,

          purchase_lines: (purchase?.purchase_lines || []).map((template:any) => ({
            product_id: template.product_id || 0,
            product_variation_id: template.product_variation_id || 0,
            quantity: template.quantity || 0,
            discount_amount: template.discount_amount || 0,
          })),

          payments: (purchase?.payments || []).map((template:any) => ({
            method: template.method || "",
            amount: template.amount || "",
          })),

          coupon_code: purchase?.coupon_code ||"",

          total_before_tax: purchase?.total_before_tax || "",
          purchase_no: purchase?.purchase_no || "",
          final_total: purchase?.final_total || "",
          payment_note: purchase?.payment_note || "",
        };
      } else {
        // If no id is received, set all values to empty strings
        return {
          id:undefined,
          business_id: business_id,
          location_id: undefined,
          supplier_id: undefined,
          type: "",
          purchase_status: "",
          payment_status: "",
          purchase_date: "",
          tax_rate_id: undefined,
          tax_amount: undefined,
          source: "",
          discount_type: "",
          discount_amount: undefined,
          created_by: business_id,

          purchase_lines: (purchase?.purchase_lines || []).map((template) => ({
            product_id: 0,
            product_variation_id: 0,
            quantity: 0,
            discount_amount:0,
          })),

          payments: (purchase?.payments || []).map((template) => ({
            method: "",
            amount: "",
          })),

          coupon_code: purchase?.coupon_code ||"",

          total_before_tax: "",
          purchase_no: "",
          final_total: "",
          payment_note: "",
        };
      }
    },
  });

  // console.log(isValid, errors, "valid status");
  // console.log("done")
  // console.log(purchase, "purchase");
  // console.log(products, "products");
  // console.log(variations, "variations");
  // console.log(locations, "locations");
  // console.log(suppliers, "suppliers");
  // console.log(tax, "tax");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getAllProduct(token, business_id);
        const variationData = await getAllVariations(token, business_id);
        const supplierData = await getAllSupplier(token, business_id);
        const locationData = await getAllLocations(token, business_id);
        const taxData = await getAllTaxs(token, business_id);
        setProducts(productData);
        setVariations(variationData);
        setSuppliers(supplierData);
        setLocations(locationData);
        setTax(taxData);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };
    fetchData();
  }, []);

  const productOptions =
    products?.map((item: Products) => ({
      name: item.name.toLowerCase(),
      label: item.name,
      value: item.id,
    })) ?? [];
  // console.log(productOptions,"productOptions")

  const variationOptions =
    variations?.map((item: Products) => ({
      name: item.name.toLowerCase(),
      label: item.name,
      value: item.id,
    })) ?? [];

  const locationOptions =
    locations?.map((item: Products) => ({
      name: item.name.toLowerCase(),
      label: item.name,
      value: item.id,
    })) ?? [];

  const supplierOptions =
    suppliers?.map((item: ProductB) => ({
      name: item.contact.f_name.toLowerCase(),
      label: item.contact.f_name,
      value: item.id,
    })) ?? [];

  const taxOptions =
    tax?.map((item: Products) => ({
      name: item.name.toLowerCase(),
      label: item.name,
      value: item.id,
    })) ?? [];

  const handleAddTemplate = () => {
    const newTemplates = [
      ...purchase_lines,
      {
        product_id: 0,
        product_variation_id: 0,
        quantity: 0,
        discount_amount:0,
      },
    ];
    // console.log(newTemplates, "newTemplates");
    setPurchase_lines(newTemplates);
    setValue("purchase_lines", newTemplates);
  };

  ///////////
  const handleRemoveTemplate = (index: number) => {
    const newTemplates = purchase_lines.filter((_, i) => i !== index);
    // console.log(newTemplates, "newTemplates");
    setPurchase_lines(newTemplates);
    setValue("purchase_lines", newTemplates);
  };

  ////////////
  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedTemplates = [...purchase_lines];
    updatedTemplates[index] = { ...updatedTemplates[index], [field]: value };
    // console.log(updatedTemplates, "updatedTemplates");
    setPurchase_lines(updatedTemplates);
    setValue("purchase_lines", updatedTemplates);
  };

  const onSubmit = async (data: AddPurchaseInput) => {
    try {
      setLoading((loading) => !loading);
      console.log(data, "data");
      purchase
        ? await toast.promise(editPurchase(data, purchase?.id, token), {
            loading: "Updating...",
            success: "Success",
            error: "Something Went Wrong",
          })
        : await toast.promise(createPurchase(data, token), {
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

  const title = purchase ? "Edit Purchase" : "Add New Purchase";
  const action = purchase ? "Edit" : "Add";
  return (
    <div className="rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
      <h4 className="text-center">{title}</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          " flex flex-col @container [&_label.block>span]:font-medium"
        )}
      >
        <div>
          <div>Variation Templates</div>
          {purchase_lines?.map((template, index) => (
            <div key={index} className="flex flex-row items-center w-full">
              <SelectBox
                className={inputStyles}
                label={`Products ${index + 1}`}
                placeholder={`Products ${index + 1}`}
                id={`Products ${index + 1}`}
                {...register(`purchase_lines.${index}.product_id`)}
                error={errors?.purchase_lines?.[0]?.product_id?.message}
                value={
                  productOptions.find(
                    (option: SelectOptionsA) =>
                      option.value ===
                      getValues(`purchase_lines.${index}.product_id`)
                  )?.label || ""
                }
                onChange={(selectedOption: SelectOptionsA) =>
                  setValue(
                    `purchase_lines.${index}.product_id`,
                    selectedOption.value
                  )
                }
                options={productOptions}
              />
              <SelectBox
                className={inputStyles}
                label={`Product Variation ${index + 1}`}
                placeholder={`Product Variation ${index + 1}`}
                id={`Product Variation ${index + 1}`}
                {...register(`purchase_lines.${index}.product_variation_id`)}
                error={
                  errors?.purchase_lines?.[0]?.product_variation_id?.message
                }
                value={
                  variationOptions.find(
                    (option: SelectOptionsA) =>
                      option.value ===
                      getValues(`purchase_lines.${index}.product_variation_id`)
                  )?.label || ""
                }
                onChange={(selectedOption: SelectOptionsA) =>
                  setValue(
                    `purchase_lines.${index}.product_variation_id`,
                    selectedOption.value
                  )
                }
                options={variationOptions}
              />
              <Input
                className={inputStyles}
                label="Quantity"
                id="quantity"
                prefix="$"
                type="number"
                min={0}
                step={1}
                // value={quantity}
                {...register(`purchase_lines.${index}.quantity`, {
                  onChange: (e) => {
                    const newValue = Number(e.target.value);
                    setValue(`purchase_lines.${index}.quantity`, newValue);
                    // setQuantity(isNaN(newValue) ? 0 : newValue);
                  },
                })}
                // suffix={
                //   <div className="-mr-3.5 grid gap-[2px] p-0.5 rtl:-ml-3.5 rtl:-mr-0">
                //     <button
                //       type="button"
                //       className="rounded-[3px] px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                //       onClick={() => setQuantity((prevState) => prevState + 1)}
                //     >
                //       <FaChevronUp className="h-2.5 w-2.5" />
                //     </button>
                //     <button
                //       type="button"
                //       className="rounded-[3px] px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                //       onClick={() =>
                //         setQuantity((prevState) => Math.max(prevState - 1, 0))
                //       }
                //     >
                //       <FaChevronDown className="h-2.5 w-2.5" />
                //     </button>
                //   </div>
                // }
                placeholder="e.g. Josh123@gmail.com"
                error={errors?.purchase_lines?.[0]?.quantity?.message}
                // defaultValue={purchase?.rent ?? 0}
              />

              {index > 0 && !purchase ? (
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
        {!purchase && (
          <Button
            color="primary"
            className="shadow-button"
            type="button"
            onClick={handleAddTemplate}
          >
            Add More Items
          </Button>
        )}
        <div className="flex flex-row flex-wrap items-center w-full">
          <SelectBox
            className={inputStyles}
            label="Supplier"
            placeholder="Choose Supplier"
            id="supplier"
            {...register("supplier_id")}
            error={errors?.supplier_id?.message}
            value={
              supplierOptions.find(
                (option: SelectOptionsA) =>
                  option.value === getValues("supplier_id")
              )?.label || ""
            }
            onChange={(selectedOption: SelectOptionsA) =>
              setValue("supplier_id", selectedOption.value)
            }
            options={supplierOptions}
          />
          <SelectBox
            className={inputStyles}
            label="Location"
            placeholder="Choose Location"
            id="location"
            {...register("location_id")}
            error={errors?.location_id?.message}
            value={
              locationOptions.find(
                (option: SelectOptionsA) =>
                  option.value === getValues("location_id")
              )?.label || ""
            }
            onChange={(selectedOption: SelectOptionsA) =>
              setValue("location_id", selectedOption.value)
            }
            options={locationOptions}
          />
          <SelectBox
            className={inputStyles}
            label="Tax Rate"
            placeholder="Choose Tax type"
            id="tax_rate"
            {...register("tax_rate_id")}
            error={errors?.tax_rate_id?.message}
            value={
              taxOptions.find(
                (option: SelectOptionsA) =>
                  option.value === getValues("tax_rate_id")
              )?.label || ""
            }
            onChange={(selectedOption: SelectOptionsA) =>
              setValue("tax_rate_id", selectedOption.value)
            }
            options={taxOptions}
          />
          <Input
            className={inputStyles}
            label="Tax Amount"
            id="tax_amount"
            prefix="$"
            type="number"
            min={0}
            step={1}
            value={tax_amount}
            {...register("tax_amount", {
              onChange: (e) => {
                const newValue = Number(e.target.value);
                setValue("tax_amount", newValue);
                setTax_amount(isNaN(newValue) ? 0 : newValue);
              },
            })}
            suffix={
              <div className="-mr-3.5 grid gap-[2px] p-0.5 rtl:-ml-3.5 rtl:-mr-0">
                <button
                  type="button"
                  className="rounded-[3px] px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                  onClick={() => setTax_amount((prevState) => prevState + 1)}
                >
                  <FaChevronUp className="h-2.5 w-2.5" />
                </button>
                <button
                  type="button"
                  className="rounded-[3px] px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                  onClick={() =>
                    setTax_amount((prevState) => Math.max(prevState - 1, 0))
                  }
                >
                  <FaChevronDown className="h-2.5 w-2.5" />
                </button>
              </div>
            }
            placeholder="e.g. Josh123@gmail.com"
            error={errors?.tax_amount?.message}
            // defaultValue={purchase?.tax_amount ?? 0}
          />
          <SelectBox
            className={inputStyles}
            label="Discount Type"
            placeholder="Choose Discount type"
            id="discount_type"
            {...register("discount_type")}
            error={errors?.discount_type?.message}
            value={
              discountOptions.find(
                (option: SelectOptionsB) =>
                  option.value === getValues("discount_type")
              )?.label || ""
            }
            onChange={(selectedOption: SelectOptionsB) =>
              setValue("discount_type", selectedOption.value)
            }
            options={discountOptions}
          />
          <Input
            className={inputStyles}
            label="Discount Amount"
            id="discount_amount"
            prefix="$"
            type="number"
            min={0}
            step={1}
            value={discount_amount}
            {...register("discount_amount", {
              onChange: (e) => {
                const newValue = Number(e.target.value);
                setValue("discount_amount", newValue);
                setDiscount_amount(isNaN(newValue) ? 0 : newValue);
              },
            })}
            suffix={
              <div className="-mr-3.5 grid gap-[2px] p-0.5 rtl:-ml-3.5 rtl:-mr-0">
                <button
                  type="button"
                  className="rounded-[3px] px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                  onClick={() =>
                    setDiscount_amount((prevState) => prevState + 1)
                  }
                >
                  <FaChevronUp className="h-2.5 w-2.5" />
                </button>
                <button
                  type="button"
                  className="rounded-[3px] px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                  onClick={() =>
                    setDiscount_amount((prevState) =>
                      Math.max(prevState - 1, 0)
                    )
                  }
                >
                  <FaChevronDown className="h-2.5 w-2.5" />
                </button>
              </div>
            }
            placeholder="e.g. Josh123@gmail.com"
            error={errors?.discount_amount?.message}
            // defaultValue={purchase?.discount_amount ?? 0}
          />
          <SelectBox
            className={inputStyles}
            label="Type"
            placeholder="Choose type"
            id="type"
            {...register("type")}
            error={errors?.type?.message}
            value={
              typeOptions.find(
                (option: SelectOptionsB) => option.value === getValues("type")
              )?.label || ""
            }
            onChange={(selectedOption: SelectOptionsB) =>
              setValue("type", selectedOption.value)
            }
            options={typeOptions}
          />
          <SelectBox
            className={inputStyles}
            label="Purchase Status"
            placeholder="Choose Purchase Status"
            id="purchase_status"
            {...register("purchase_status")}
            error={errors?.purchase_status?.message}
            value={
              purchaseOptions.find(
                (option: SelectOptionsB) =>
                  option.value === getValues("purchase_status")
              )?.label || ""
            }
            onChange={(selectedOption: SelectOptionsB) =>
              setValue("purchase_status", selectedOption.value)
            }
            options={purchaseOptions}
          />
          <SelectBox
            className={inputStyles}
            label="Payment Status"
            placeholder="Choose Payment Status"
            id="payment_status"
            {...register("payment_status")}
            error={errors?.payment_status?.message}
            value={
              paymentOptions.find(
                (option: SelectOptionsB) =>
                  option.value === getValues("payment_status")
              )?.label || ""
            }
            onChange={(selectedOption: SelectOptionsB) =>
              setValue("payment_status", selectedOption.value)
            }
            options={paymentOptions}
          />
          <SelectBox
            className={inputStyles}
            label="Source"
            placeholder="Choose Source"
            id="source"
            {...register("source")}
            error={errors?.source?.message}
            value={
              sourceOptions.find(
                (option: SelectOptionsB) => option.value === getValues("source")
              )?.label || ""
            }
            onChange={(selectedOption: SelectOptionsB) =>
              setValue("source", selectedOption.value)
            }
            options={sourceOptions}
          />
          <SelectBox
            className={inputStyles}
            label="Payment Method"
            placeholder="Choose Payment Method"
            id="payment_method"
            {...register(`payments.0.method`)}
            error={errors?.payments?.[0]?.method?.message}
            value={
              payment2Options.find(
                (option: SelectOptionsB) =>
                  option.value === getValues(`payments.0.method`)
              )?.label || ""
            }
            onChange={(selectedOption: SelectOptionsB) =>
              setValue(`payments.0.method`, selectedOption.value)
            }
            options={payment2Options}
          />
          <Input
            className={inputStyles}
            label="Purchase Date"
            id="purchase_date"
            type="date"
            placeholder="Purchase Date"
            {...register(`purchase_date`)}
            error={errors?.purchase_date?.message}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default UserFormModal;
