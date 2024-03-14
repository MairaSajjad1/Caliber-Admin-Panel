import { getServerAuthSession } from "@/lib/auth"
import { AddPurchaseInput } from "@/validators/add-purchase"
import axios from "axios"

export const getAllPurchase = async () => {
    try {
        const session = await getServerAuthSession()
        const { token, business_id } = session?.user!
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/purchase?`, {
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


export const deletePurchase = async (id: number, token: string) => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/purchase/delete/${id}`, null, {
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

export const createPurchase = async (PurchaseData: AddPurchaseInput, token: string) => {
    const { type, ...rest } = PurchaseData
    const payload = {
       name: name,
        ...rest,
    }
    try {
        const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/purchase/create`, payload, {
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


export const editPurchase = async (PurchaseData: AddPurchaseInput, id: number, token: string) => {
    const { type,...rest } = PurchaseData
    const payload = {
        name: name,
        ...rest,
    }
    try {
        const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/purchase/update/${id}`, payload, {
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