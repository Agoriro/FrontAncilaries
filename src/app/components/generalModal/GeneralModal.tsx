import React from "react"
import { IconX } from "@/app/components";
interface generalModalI {
    width: string,
    height: string,
    styleAditionals?: string,
    styleAditionalsSecond?: string,
    children: React.ReactNode,
    tittle: string,
    setActiveModal:React.Dispatch<React.SetStateAction<boolean>>
    activeModal:boolean,
    error?:boolean
}
export const GeneralModal: React.FC<generalModalI> = ({ width, height, children, styleAditionals, styleAditionalsSecond, tittle,setActiveModal,activeModal, error }) => {
    return (
        <div className={`w-full h-full fixed top-0 left-0 z-[100] flex items-center justify-center ${error ? "backdrop-blur-0 bg-[#FFFFFF]" : "backdrop-blur-sm"}`}>
            <div className={`shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] rounded-lg p-8 my-10 absolute bg-[#FAFAFA] w-${width} h-${height} ${styleAditionals}`}>
                <div className={styleAditionalsSecond}>
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-bold">
                            {tittle}
                        </h1>
                        <small className={`cursor-pointer ${error ? "hidden" : ""}`} onClick={()=>setActiveModal(!activeModal)}>
                            <IconX></IconX>
                        </small>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}
