"use server"

import { api } from "./api";

export const getAllMemes = async () => {
    try {
        const response = await api.get("/meme");
        console.log(response)
        return {
            page: response.data
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}

export const createMeme = async (previousState: any, formData: FormData) => {
    try {
        await api.post("/meme", formData);
        return {
            
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}

export const getMeme = async (id: number) => {
    try {
        const response = await api.get(`/meme/${id}`);
        console.log(response.data)
        return response.data
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}