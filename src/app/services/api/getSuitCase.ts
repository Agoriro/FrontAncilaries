import { RequestSuitcase } from "@/types"

const API_BASE_URL = "https://localhost:7151/api";
//const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
console.log(API_BASE_URL,"endpoint")
export const sendSuitcaseInformation = async (data:any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/GetMaletas/`,
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