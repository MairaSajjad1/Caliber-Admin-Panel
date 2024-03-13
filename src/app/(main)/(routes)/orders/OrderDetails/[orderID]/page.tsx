// "use client";
// import { useGetSpecificOrderQuery } from "@/store/services/orderListService";
// import { FC } from "react";

// interface SpecificOrderProps {
//   orderId: string;
// }

// export interface OrderDetail {
//   id: number
//   business_id: number
//   location_id: number
//   order_no: string
//   payment_status: string
//   order_type: string
//   final_total: number
//   source: string
//   address: string
//   order_lines: OrderLine[]
//   payment_lines: PaymentLine[]
//   customer: Customer
// }

// export interface OrderLine {
//   id: number
//   order_id: number
//   business_id: number
//   product_id: number
//   qty: number
//   product: Product
// }

// export interface Product {
//   id: number
//   name: string
//   description: string
//   business_id: number
// }

// export interface ProductStock {
//   id: number
//   business_id: number
//   location_id: number
//   product_id: number
// }

// export interface PaymentLine {
//   id: number
//   order_id: number
//   purchase_id: any
//   business_id: number
//   method: string
//   amount: string
//   type: string
// }

// export interface Customer {
//   id: number
//   name: string
//   business_id: number
//   mobile_no: string
//   email: any
//   city: any
//   state: any
//   landmark: any
//   home_address: any
// }


// const SpecificOrder: FC<SpecificOrderProps> = ({ orderId }) => {
//   const {
//     data: order,
//     isLoading: orderLoading,
//     isFetching: orderFetching,
//   } = useGetSpecificOrderQuery({
//     orderId,
//   });

//   console.log("Order API Response:", order);

//   if (order){
//     console.log("data" ,order.data.id);
   
//   }

//   if (orderLoading)
//     return (
//       <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
//         Loading ...
//       </div>
//     );
//   return (
//     <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
//       <h1 className="font-semibold text-xl text-[#080808]">Order Details</h1>
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg text-[#080808]">Order No:</h3>
//           <h3>{order?.data?.[0]?.order_no}</h3>
//         </div>
       
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg text-[#080808]">Payment Status:</h3>
//           <h3>{order?.data?.[0]?.payment_status}</h3>
//         </div>
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg text-[#080808]">Order Date:</h3>
//           <h3>{new Date(order?.data?.[0]?.created_at).toDateString()}</h3>
//         </div>
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg text-[#080808]">Price:</h3>
//           <h3>{order?.data?.[0]?.final_total}</h3>
//         </div>
//       </div>

//       {/*shipment detail here */}
//       <div>
//       <h1 className="font-semibold text-xl text-[#080808]">Shipment Details</h1>
//       </div>
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg text-[#080808]">product name:</h3>
//           <h3>{order?.data?.[0]?.order_lines[0]?.product?.name}</h3>
//         </div>
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg text-[#080808]">Qty:</h3>
//           <h3>{order?.data?.[0]?.order_lines[0]?.qty}</h3>
//         </div>
//       </div>

//         {/* delivery location here */}
//         <div>
//         <h1 className="font-semibold text-xl text-[#080808]">Delivery Location</h1>
//         </div>
//          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg text-[#080808]">Customer Name</h3>
//           <h3>{order?.data?.[0]?.customer?.name}</h3>
//         </div>
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg text-[#080808]">Customer Phone</h3>
//           <h3>{order?.data?.[0]?.customer?.mobile_no}</h3>
//         </div>
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg text-[#080808]">Address:</h3>
//          <h3>{order?.data?.[0]?.address}</h3>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default SpecificOrder;

"use client"
import React from 'react'

function OrderDetailsPage() {
    return (
        <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
          <h1 className="font-semibold text-xl text-[#080808]">Order Details</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-[#080808]">Order No:</h3>
              {/* <h3>{order?.data?.[0]?.order_no}</h3> */}
            </div>
           
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-[#080808]">Payment Status:</h3>
              {/* <h3>{order?.data?.[0]?.payment_status}</h3> */}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-[#080808]">Order Date:</h3>
              {/* <h3>{new Date(order?.data?.[0]?.created_at).toDateString()}</h3> */}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-[#080808]">Price:</h3>
              {/* <h3>{order?.data?.[0]?.final_total}</h3> */}
            </div>
          </div>
    
          {/*shipment detail here */}
          <div>
          <h1 className="font-semibold text-xl text-[#080808]">Shipment Details</h1>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-[#080808]">product name:</h3>
              {/* <h3>{order?.data?.[0]?.order_lines[0]?.product?.name}</h3> */}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-[#080808]">Qty:</h3>
              {/* <h3>{order?.data?.[0]?.order_lines[0]?.qty}</h3> */}
            </div>
          </div>
    
            {/* delivery location here */}
            <div>
            <h1 className="font-semibold text-xl text-[#080808]">Delivery Location</h1>
            </div>
             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-[#080808]">Customer Name</h3>
              {/* <h3>{order?.data?.[0]?.customer?.name}</h3> */}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-[#080808]">Customer Phone</h3>
              {/* <h3>{order?.data?.[0]?.customer?.mobile_no}</h3> */}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-[#080808]">Address:</h3>
             {/* <h3>{order?.data?.[0]?.address}</h3> */}
            </div>
    
          </div>
        </div>
      );
}

export default OrderDetailsPage

