import { getServerAuthSession } from "@/lib/auth"
import { AddUserInput } from "@/validators/add-user"
import axios from "axios"

export const getAllOrders = async () => {
    try {
        const session = await getServerAuthSession()
        const { token, business_id, customer_id} = session?.user!
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/report?`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            params: {
                business_id: business_id,
                customer_id: customer_id,
                per_page: -1,
                
            },
        })

        return data.data
    } catch (error) {
        throw error
    }
}

export const getSpecificUser = async (id: number) => {
    try {
        const session = await getServerAuthSession()
        const { token, business_id } = session?.user!
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            params: {
                business_id: business_id,
            },
        })

        return data.data
    } catch (error) {
        throw error
    }
}

