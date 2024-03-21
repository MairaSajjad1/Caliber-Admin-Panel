import { getServerAuthSession } from "@/lib/auth"
import { AddUserInput } from "@/validators/add-user"
import axios from "axios"

export const getAllOrders = async () => {
    try {
        const session = await getServerAuthSession()
        const { token, business_id } = session?.user!
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/check?user_type=admin`, {
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

export const getSpecificOrder = async (id:number,token:string,business_id:number) => {
    try {
        // const session = await getServerAuthSession()
        // const { token, business_id } = session?.user!
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${id}`, {
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
