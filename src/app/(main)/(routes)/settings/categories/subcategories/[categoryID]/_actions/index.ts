import { getServerAuthSession } from "@/lib/auth"
import { AddSubCategoryInput } from "@/validators/add-subcategory"
import axios from "axios"

export const getAllSubCategories = async (id:number) => {
    try {
        const session = await getServerAuthSession()
        const { token, business_id } = session?.user!
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}`, {
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


export const deleteSubCategory = async (id: number, token: string) => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/delete/${id}`, null, {
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

export const createSubCategory = async (subcategoryData: AddSubCategoryInput, token: string) => {
    const { name, ...rest } = subcategoryData
    const payload = {
       name: name,
        ...rest,
    }
    try {
        const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/create`, payload, {
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


export const editSubCategory  = async (subcategoryData: AddSubCategoryInput, id: number, token: string) => {
    const { name,...rest } = subcategoryData
    const payload = {
        name: name,
        ...rest,
    }
    try {
        const { data, status } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/update/${id}`, payload, {
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