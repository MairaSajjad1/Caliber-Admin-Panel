"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';


const ProductFormModal = dynamic(() => import("../createProduct/page"), {
  ssr: false,
});

const AddProduct = () => {

  const router = useRouter();

  const handleEditProductClick = () => {
    router.push(`/products/productlist/createProduct`); // Navigate to CreateUser page with user ID as query parameter
  };
  return (
    <Button
      color="primary"
      onClick={handleEditProductClick}
      className={cn("h-auto  w-fit  shadow-button ")}
    >
       Add Product
    </Button>
  
  );
};

export default AddProduct;
