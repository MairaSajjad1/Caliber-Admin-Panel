import { getServerAuthSession } from "@/lib/auth"
import { AddProductInput } from "@/validators/add-product"
import axios from "axios"

export const getAllProduct = async () => {
    try {
        const session = await getServerAuthSession()
        const { token, business_id } = session?.user!
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/test/product`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            params: {
                business_id: business_id,
                per_page: -1,
            },
        })

        return data.data
    } catch (error) {
        throw error
    }
}


export const deleteProduct = async (id: number, token: string) => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/delete/${id}`, null, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        return data.data
    } catch (error) {
        throw error
    }
}
export const getSpecificProduct = async (
    id: number,
    token: string,
    business_id: number
  ) => {
    try {
      // const session = await getServerAuthSession()
      // const { token, business_id } = session?.user!
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
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

export const createProduct = async (productData: AddProductInput, token: string) => {
    const { name, ...rest } = productData
    const payload = {
       name: name,
        ...rest,
    }
    try {
        const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/create`, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })


        if (status === 201) {
            return data.data
        } else {
            throw new Error("Something Went Wrong")
        }
    } catch (error) {
        throw error;
    }
}


export const editProduct = async (productData: AddProductInput, id: number, token: string) => {
    const { name,...rest } = productData
    const payload = {
        name: name,
        ...rest,
    }
    try {
        const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/edit/${id}`, payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })


        if (status === 201) {
            return data.data
        } else {
            throw new Error("Something Went Wrong")
        }
    } catch (error) {
        throw error;
    }

}