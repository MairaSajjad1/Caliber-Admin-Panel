"use client";
import { useForm } from "react-hook-form";
import Select from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AddUserInput, userFormSchema } from "@/validators/add-user";
import { cn } from "@/lib/utils";
import { Input, Password } from "@/components/ui/input";
import { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { createUser, editUser, getSpecificUser } from "../_actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserT } from "../_types";
import AddressTable from "./_components/address-table";

interface SelectedOption {
  value: string;
}

interface Users {
  user?: UserT;
  searchParams: {
    id: number;
  };
  userId?:number | undefined;
}

const UserCreate: FC<Users> = (props) => {
  const { id } = props.searchParams || {};
  const inputStyles =
    " w-full sm:w-full md:w-[48%] lg:w-[32%] my-2 mr-3 rounded-lg";
  const router = useRouter();
  const { refresh } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const [user, setUser] = useState<UserT>();
  const { token, business_id } = session?.user!;

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddUserInput>({
    resolver: zodResolver(userFormSchema),
    defaultValues: async () => {
      if (id) {
        const [user] = await getSpecificUser(id, token, business_id);
        setUser(user);
        sessionStorage.setItem("addresses", JSON.stringify(user.addresses));

        return {
          id: user?.id,
          phoneNumber: user?.mobile_no || "",
          contacts: {
            f_name: user?.contact?.f_name || "",
            l_name: user?.contact?.l_name || "",
            dob: user?.contact?.dob ? formatDate(user.contact.dob) : "",
            // dob: user?.contact?.dob || "",
            gender: user?.contact?.gender || "",
          },
          addresses: user?.addresses,
          password: "",
          business_id,
        };
      } else {
        // If no id is received, set all values to empty strings
        return {
          id:undefined,
          phoneNumber: "",
          contacts: {
            f_name: "",
            l_name: "",
            dob: "",
            gender: "",
          },
          addresses: [],
          password: "",
          business_id,
        };
      }
    },
  });

  console.log(isValid, errors, "valid status");

  const sessionAddresses = sessionStorage.getItem("addresses");
  const addresses = sessionAddresses ? JSON.parse(sessionAddresses) : [];


  const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  ////remove any addreses stored inside session when intial render
  useEffect(() => {
    sessionStorage.removeItem("addresses");
  }, []);

  ////append addreses from session storage to formdata everytime the addreses change
  useEffect(() => {
    console.log(addresses,"addreses in setvalue useEffect")
    setValue("addresses", addresses);
  }, [addresses, setValue]);

  const onSubmit = async (data: AddUserInput) => {
    try {
      setLoading(true);
      console.log(data, "data in submit");
      user
        ? await toast.promise(editUser(data, user?.id, token), {
            loading: "Updating...",
            success: "Success",
            error: "Something Went Wrong",
          })
        : await toast.promise(createUser(data, token), {
            loading: "Adding...",
            success: "Success",
            error: "Something Went Wrong",
          });
      sessionStorage.removeItem("addresses");
      router.push("/user-management/all-users");
      refresh();
      // closeModal();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const title = user ? "Edit User" : "Add New User";
  const action = user ? "Edit" : "Submit";

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
          label="First Name"
          placeholder="First Name"
          {...register(`contacts.f_name`)}
          error={errors?.contacts?.f_name?.message}
        />
        <Input
          className={inputStyles}
          label="Last Name"
          placeholder="Last Name"
          {...register(`contacts.l_name`)}
          error={errors?.contacts?.l_name?.message}
        />
        <Input
          className={inputStyles}
          label="Phone Number"
          placeholder="Phone Number"
          {...register(`phoneNumber`)}
          error={errors?.phoneNumber?.message}
        />
        <Password
          className={inputStyles}
          label="Password"
          placeholder="Password"
          {...register(`password`)}
          error={errors?.password?.message}
        />
        <Input
          className={inputStyles}
          label="Date of Birth"
          placeholder="e.g 20/6/2019"
          {...register(`contacts.dob`)}
          error={errors?.contacts?.dob?.message}
        />
        <Select
          className={inputStyles}
          label="Gender"
          placeholder="Select Gender"
          id="occupation"
          error={errors?.contacts?.gender?.message}
          value={getValues("contacts.gender")}
          onChange={(selectedOption) =>
            setValue(
              "contacts.gender",
              (selectedOption as SelectedOption)?.value || ""
            )
          }
          options={[
            { value: "Female", name: "Female" },
            { value: "Male", name: "Male" },
            { value: "Others", name: "Others" },
          ]}
        />
        <div className="w-full rounded-xl p-4 overflow-hidden bg-gradient-to-br from-white via-white to-white/40">
          <AddressTable addresses={addresses} userId={user?.id}/>
        </div>
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
};

export default UserCreate;
