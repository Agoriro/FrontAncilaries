"use client";
import { FC, useEffect, useState } from "react";
import { GeneralContainer } from "../generalContainer/GeneralContainer";
import { ArrowDown, ArrowUp } from "../icons/Icons";
import { ResponseData } from "@/types";
import { Response, Order, DataLists, FareList, PaxList, CurCode } from '../../../types/manageReservation/ResponseDataModel';
import { formatPrice } from "@/app/(pages)/utils/formatPrice";

interface Props {
    allData: ResponseData | any;
}

export const PaymentInformation: FC<Props> = ({ allData }) => {

    const [collapsePassangerInfo, setCollapsePassangerInfo] = useState(false);
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);

    useEffect(() => {
        if (allData) {
            let adultsCounter = 0
            let childrenCounter = 0
            let infantsCounter = 0

            allData.Response.DataLists.PaxList.map((data: any, i: number) => {
                if (data.PTC === "ADT") {
                    adultsCounter = adultsCounter + 1
                } else if (data.PTC === "INF") {
                    childrenCounter = childrenCounter + 1
                } else if (data.PTC === "CHD") {
                    infantsCounter = infantsCounter + 1
                }
            });

            setAdults(adultsCounter)
            setChildren(childrenCounter)
            setInfants(infantsCounter)
        }
    }, [allData]);

    let formattedTotalAmount
    // let formattedBaseAmount
    // const [taxes, setTaxes] = useState([''])

    if(allData) {
        formattedTotalAmount = formatPrice(allData?.Response.Order[0].TotalPrice.TotalAmount.Value, allData?.Response.Order[0].TotalPrice.TotalAmount.CurCode);
        // formattedBaseAmount = formatPrice(allData?.Response.DataLists.FareList[0].FareDetail[0].FarePriceType[0].Price.BaseAmount.Value, allData?.Response.DataLists.FareList[0].FareDetail[0].FarePriceType[0].Price.BaseAmount.CurCode);
        // allData?.Response.DataLists.FareList[0].FareDetail[0].FarePriceType[0].Price.TaxSummary[0].Tax.map((tax: any, i: number) => {
        //     const taxData = formatPrice(tax.Amount.Value, tax.Amount.CurCode) 
        //     taxes[i] = taxData
        //     console.log(taxes)
        // })
    }
    

    return (
        <div>
            {allData ?
                <GeneralContainer width="w-full" height="h-fit-content" styleAditionals="bg-[#FFFFFF] px-6 py-6 mt-20" styleAditionalsSecond="flex flex-col w-full">
                    <div className="flex justify-between">
                        <div className="flex items-center text-lg font-semibold">
                            Información de pago
                        </div>
                        <a className="items-center flex cursor-pointer" onClick={() => setCollapsePassangerInfo(!collapsePassangerInfo)}>
                            <span className="flex items-center font-semibold text-avia-blue">{collapsePassangerInfo ? "Ocultar detalle" : "Ver detalle"} {collapsePassangerInfo ? <small className="px-2"><ArrowUp></ArrowUp></small> : <small className="px-2"><ArrowDown></ArrowDown></small>}</span>
                        </a>
                    </div>
                    <div className={`collapse-container ${collapsePassangerInfo ? "open" : "closed"}`}>
                        <div className="mt-4 px-6">
                            <span>Total para todos los pasajeros (incluye sobrecargos e impuestos)</span>
                            {/* <h3 className="text-lg font-semibold">{allData?.Response.Order.TotalPrice.TotalAmount.CurCode} {allData?.Response.Order.TotalPrice.TotalAmount.Value}</h3> */}
                            {/* <h3 className="text-lg font-semibold">{formattedTotalAmount}</h3> */}
                            <div className="gridAdjustCols gap-x-8 gap-y-10 grid-rows-[1fr, 1fr] grid mt-2">
                                {/* <div className="font-semibold">Servicios</div>
                            <div>COP 312.400,00</div> */}
                                <div className="flex flex-col font-semibold">
                                    <span>{adults ? `${adults} ${adults === 1 ? 'adulto' : 'adultos'}` : ''}</span>
                                    <span>{children ? `${children} ${children === 1 ? 'niño' : 'niños'}` : ''}</span>
                                    <span>{infants ? `${infants} ${infants === 1 ? 'infante' : 'infantes'}` : ''}</span>
                                </div>
                                <div>
                                    {/* <div className="mb-12">
                                        <span className="text-base">Tarifa base</span>
                                        <div className="containerGridPayment items-end my-3">
                                            <span>Tarifa base</span>
                                            <hr className="mx-4 border-dashed border-[#585858] opacity-[0.50]" />
                                            <span>{formattedBaseAmount}</span>
                                        </div>
                                    </div>
                                    <div className="my-12">
                                        <span className="text-base">Otras tarifas</span>
                                        {taxes && taxes.map((tax: any, i: number) => (
                                            <div key={i} className="containerGridPayment items-end my-3">
                                                <span>Tarifa {i + 1
                                                }</span>
                                                <hr className="mx-4 border-dashed border-[#585858] opacity-[0.50]" />
                                                <span>{tax}</span>
                                            </div>
                                        ))
                                        }
                                    </div> */}
                                    <div className="mt-12">
                                        {/* <div className="containerGridPayment items-end my-3">
                                        <span>Total por 1 adulto</span>
                                        <hr className="mx-4 border-dashed border-[#585858] opacity-[0.50]" />
                                        <span>COP 101.500,00</span>
                                    </div>
                                    <div className="containerGridPayment items-end my-3">
                                        <span>Total por un infante</span>
                                        <hr className="mx-4 border-dashed border-[#585858] opacity-[0.50]" />
                                        <span>COP 101.500,00</span>
                                    </div> */}
                                        <div className="containerGridPayment items-end my-3 text-base">
                                            <span className="font-semibold">Total</span>
                                            <hr className="mx-4 border-dashed border-[#585858] opacity-[0.50]" />
                                            <span className="font-semibold">{formattedTotalAmount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </GeneralContainer>
                :
                <div className="left-0 fixed top-0 w-full h-full flex justify-center items-center backdrop-blur-sm">
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            }
        </div>
    );
};