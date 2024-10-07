import { ClientData } from "@/types"
import { useState } from "react";

const API_BASE_URL = "https://localhost:7151/api";
//const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const sendReservationInformation = async (data: ClientData) => {
    // const [dataModel, SetDataModel] = useState();
    try {
        const response = await fetch(`${API_BASE_URL}/GetReserva/`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if(!response.ok){
                throw new Error(`HTTP ERROR, status:${response.status}`);
            }
            const result = await response.json();
            console.log(result);
            return result;
    }
    catch(error) {
        console.log("Error", error);
        throw error;
    }

}