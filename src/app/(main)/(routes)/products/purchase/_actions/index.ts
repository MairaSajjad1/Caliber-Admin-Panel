import { getServerAuthSession } from "@/lib/auth";
import { AddPurchaseInput } from "@/validators/add-purchase";
import axios from "axios";

export const getAllProduct = async (token: string, business_id: number) => {
  try {
    // const session = await getServerAuthSession()
    // const { token, business_id } = session?.user!
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/test/product`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          business_id: business_id,
          per_page: -1,
        },
      }
    );
    // console.log(data, "data getAllProduct");
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllVariations = async (token: string, business_id: number) => {
  try {
    // const session = await getServerAuthSession()
    // const { token, business_id } = session?.user!
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/variation`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          business_id: business_id,
          per_page: -1,
        },
      }
    );
    // console.log(data, "data getAllVariations");
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllLocations = async (token: string, business_id: number) => {
  try {
    // const session = await getServerAuthSession()
    // const { token, business_id } = session?.user!
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/locations`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          business_id: business_id,
          per_page: -1,
        },
      }
    );
    // console.log(data, "data getAllLocations");
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllSupplier = async (token: string, business_id: number) => {
  try {
    //   const session = await getServerAuthSession();
    //   const { token, business_id } = session?.user!;
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/get-supplier?&user_type=supplier`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          business_id: business_id,
          per_page: -1,
        },
      }
    );
    // console.log(data, "data getAllSupplier");
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTaxs = async (token: string, business_id: number) => {
  try {
    // const session = await getServerAuthSession()
    // const { token, business_id } = session?.user!
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tax`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          business_id: business_id,
          per_page: -1,
        },
      }
    );
    // console.log(data, "data getAllTaxs");
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPurchase = async () => {
  try {
    const session = await getServerAuthSession();
    const { token, business_id } = session?.user!;
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/purchase?`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          business_id: business_id,
          per_page: -1,
        },
      }
    );
    // console.log(data, "data getAllPurchase");
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPurchases = async (
  token: string,
  business_id: number,
  id: number
) => {
  try {
    // const session = await getServerAuthSession()
    // const { token, business_id } = session?.user!
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/purchase?`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          business_id: business_id,
          per_page: -1,
        },
      }
    );
    // console.log(data.data, "data before getAllPurchases");
    const foundPurchase = data.data.filter(
      (purchase: any) => purchase.id === Number(id)
    );

    // console.log(foundPurchase, "data getAllPurchases");
    return foundPurchase;
  } catch (error) {
    throw error;
  }
};

export const getSpecificPurchase = async (
  id: number,
  token: string,
  business_id: number
) => {
  try {
    // const session = await getServerAuthSession()
    // const { token, business_id } = session?.user!
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/purchase/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          business_id: business_id,
          per_page: -1,
        },
      }
    );

    // console.log(data, "data getSpecificPurchase");
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const deletePurchase = async (id: number, token: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/purchase/delete/${id}`,
      null,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.data;
  } catch (error) {
    throw error;
  }
};

export const createPurchase = async (
  PurchaseData: AddPurchaseInput,
  token: string
) => {
  try {
    console.log(PurchaseData, "purchasedat");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/purchase/create`,
      PurchaseData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response, "response");
    if (response) {
      return response;
    } else {
      throw new Error("Something Went Wrong");
    }
  } catch (error) {
    console.log("inside error");
    throw error;
  }
};

export const editPurchase = async (
  PurchaseData: AddPurchaseInput,
  id: number,
  token: string
) => {
  const { type, ...rest } = PurchaseData;
  const payload = {
    name: name,
    ...rest,
  };
  try {
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/purchase/update/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (status === 201) {
      return data.data;
    } else {
      throw new Error("Something Went Wrong");
    }
  } catch (error) {
    throw error;
  }
};
