import { SelectedSuitcases } from "@/types"

const API_BASE_URL = "http://localhost:5026/api";
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
console.log(API_BASE_URL,"endpoint")
export const sendCreateProductInformation = async (data:SelectedSuitcases) => {
    try {
        const response = await fetch(`${API_BASE_URL}/CrearProducto/`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if(!response.ok){
                throw new Error(`HTTP ERROR, status:${response.status}`);
            }
            const result = await response.json();
            return result;
    }
    catch(error) {
        console.log("Error", error);
        throw error;
    }

}