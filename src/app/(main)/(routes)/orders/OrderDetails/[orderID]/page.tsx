"use client";
import { getSpecificOrder } from "../../_actions";
import { FC, useEffect, useState } from "react";
import { OrderT } from "../../_types";
import { useSession } from "next-auth/react";

interface OrderDetail {
  order_no: string;
  payment_status: string;
  created_at: string;
  final_total: number;
  order_lines: {
    product: {
      name: string;
    };
    qty: number;
  }[];
  customer: {
    name: string;
    mobile_no: string;
  };
  address: string;
}
[];

interface SpecificOrderProps {
  orderId: number;
  params: {
    orderID: string;
  };
}

const OrderDetailsPage: FC<SpecificOrderProps> = (props) => {
  // console.log(props,"props")
  const { orderID } = props.params;
  const { data: session } = useSession();
  const { token, business_id } = session?.user!;
  const [order, setOrder] = useState<OrderDetail[]>([]);
  const orderId = parseInt(
    decodeURIComponent(orderID || "").match(/\d+/)?.[0] ?? "",
    10
  );
  useEffect(() => {
    const fetchData = async () => {
      const order = await getSpecificOrder(orderId, token, business_id);
      setOrder(order);
    };

    fetchData();
  }, []);

  // console.log(order, "order");

  if (!order.length)
    return (
      <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
        Loading ...
      </div>
    );

  return (
    <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
      <h1 className="font-semibold text-xl text-[#080808]">Order Details</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Order No:</h3>
          <h3>{order?.[0]?.order_no}</h3>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Payment Status:</h3>
          <h3>{order?.[0]?.payment_status}</h3>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Order Date:</h3>
          <h3>{new Date(order?.[0]?.created_at).toDateString()}</h3>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Price:</h3>
          <h3>{order?.[0]?.final_total}</h3>
        </div>
      </div>

      {/*shipment detail here */}
      <div>
        <h1 className="font-semibold text-xl text-[#080808]">
          Shipment Details
        </h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">product name:</h3>
          <h3>{order?.[0]?.order_lines[0]?.product?.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Qty:</h3>
          <h3>{order?.[0]?.order_lines[0]?.qty}</h3>
        </div>
      </div>

      {/* delivery location here */}
      <div>
        <h1 className="font-semibold text-xl text-[#080808]">
          Delivery Location
        </h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
        {/* 
the below commented out fields cannot be shown because there concerned fields are not coming from backend response */}
        {/* <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Customer Name</h3>
          <h3>{order?.[0]?.customer?.name}</h3>
        </div> */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Customer Phone</h3>
          <h3>{order?.[0]?.customer?.mobile_no}</h3>
        </div>
        {/* <div className="flex items-center justify-between">
          <h3 className="text-lg text-[#080808]">Address:</h3>
          <h3>{order?.[0]?.address}</h3>
        </div> */}
      </div>
    </div>
  );
};

export default OrderDetailsPage;