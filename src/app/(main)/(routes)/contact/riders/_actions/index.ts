import { getServerAuthSession } from "@/lib/auth";
import { AddUserInput } from "@/validators/add-user";
import { AddUserAddressInput } from "@/validators/add-user-address";
import axios from "axios";

export const getAllRiders = async () => {
  try {
    const session = await getServerAuthSession();
    const { token, business_id } = session?.user!;
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/riders?&user_type=rider`,
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

    return data.data;
  } catch (error) {
    throw error;
  }
};

export const getSpecificRider = async (
  id: number,
  token: string,
  business_id: number
) => {
  try {
    // const session = await getServerAuthSession()
    // const { token, business_id } = session?.user!
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/rider/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          business_id: business_id,
        },
      }
    );
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRider = async (id: number, token: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/rider/delete/${id}`,
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

export const createRider = async (userData: AddUserInput, token: string) => {
  const { phoneNumber, ...rest } = userData;
  const payload = {
    mobile_no: phoneNumber,
    ...rest,
  };
  try {
    console.log(payload, "payload");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/rider/register`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response, "response");
    if (response) {
      console.log(response, "response");
      return response;
    } else {
      throw new Error("Something Went Wrong");
    }
  } catch (error) {
    console.log(error, "error");
    throw error;
  }
};

export const editRider = async (
  userData: AddUserInput,
  id: number,
  token: string
) => {
  const { phoneNumber, ...rest } = userData;
  const payload = {
    mobile_no: phoneNumber,
    ...rest,
  };
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/rider/edit/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data, "data");
    if (data) {
      return data.data;
    } else {
      throw new Error("Something Went Wrong");
    }
  } catch (error) {
    throw error;
  }
};

export const createAddress = async (userData:AddUserAddressInput, token: string) => {
  try {
    console.log(userData, "payload");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/update`,
      userData,
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
    throw error;
  }
};

export const editAddress = async (
  userData:AddUserAddressInput,
  id: number,
  token: string
) => {

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/address/update/${id}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data, "data");
    if (data) {
      return data.data;
    } else {
      throw new Error("Something Went Wrong");
    }
  } catch (error) {
    throw error;
  }
};