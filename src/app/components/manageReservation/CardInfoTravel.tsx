"use client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { GeneralContainer } from "../generalContainer/GeneralContainer";
import { ArrowDown, ArrowUp, BaggageIncluded, BaggageNotIncluded, HandBaggageActive, HandBaggageInactive, IconFlightPoints, IconFlightPointsBlue, PersonalBaggageActive, StoreBaggageActive, StoreBaggageInactive } from "../icons/Icons";
import { PaxSegmentList } from "@/types";

interface Props {
    travelData: PaxSegmentList | any;
    counter: number;
    baggage: string;
}

export const CardInfoTravel: FC<Props> = ({ travelData, counter, baggage }) => {
    const [collapseInfoTravel, setCollapseInfoTravel] = useState(false);

    const formatDate = (dateString: any) => {
        const months = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} de ${month} del ${year}`;
    };

    const formatTime = (timeString: any) => {
        const date = new Date(timeString);

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`;
    };

    return (
        <>
            <GeneralContainer width="w-full" height="h-fit-content" styleAditionals="bg-[#FFFFFF] px-6 py-6" styleAditionalsSecond="flex flex-col w-full">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <span className="mr-1">Trayecto {counter + 1}:</span>
                        <span className="flex items-center">{travelData.Dep.IATA_LocationCode} <small className="px-2"><IconFlightPoints></IconFlightPoints></small> {travelData.Arrival.IATA_LocationCode}<small className="px-2">|</small></span>
                        <span>{formatDate(travelData.Dep.AircraftScheduledDateTime.Value)}</span>
                    </div>
                    <a className="items-center flex cursor-pointer" onClick={() => setCollapseInfoTravel(!collapseInfoTravel)}>
                        <span className="flex items-center font-semibold text-avia-blue">{collapseInfoTravel ? "Ocultar detalle" : "Ver detalle"} {collapseInfoTravel ? <small className="px-2"><ArrowUp></ArrowUp></small> : <small className="px-2"><ArrowDown></ArrowDown></small>}</span>
                    </a>
                </div>
                <div className={`collapse-container ${collapseInfoTravel ? "open" : "closed"}`}>
                    <div className="px-6">
                        <div className="my-5 flex items-center">
                            <hr className="hrFlight" />
                            <small className="px-2"><IconFlightPointsBlue></IconFlightPointsBlue></small>
                            <hr className="hrFlight" />
                        </div>
                        <div className="grid-cols-2 grid-rows-[1fr, 1fr] grid">
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold">{travelData.Dep.IATA_LocationCode}</h3>
                                <div className="mb-2"><span className="font-semibold">Hora de salida:</span> {formatTime(travelData.Dep.AircraftScheduledDateTime.Value)}</div>
                                <div className="mb-2"><span className="font-semibold">Origen:</span> {travelData.Dep.IATA_LocationCode}</div>
                                <div className="mb-2"><span className="font-semibold">Aeropuerto:</span> Aeropuerto Internacional El Dorado</div>
                                {/* <div><span className="font-semibold">Terminal:</span> Terminal 1, El Dorado</div> */}
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold">{travelData.Arrival.IATA_LocationCode}</h3>
                                <div className="mb-2"><span className="font-semibold">Hora de salida:</span> {formatTime(travelData.Arrival.AircraftScheduledDateTime.Value)}</div>
                                <div className="mb-2"><span className="font-semibold">Origen:</span> {travelData.Arrival.IATA_LocationCode}</div>
                                <div className="mb-2"><span className="font-semibold">Aeropuerto:</span> Aeropuerto Panamá</div>
                                {/* <div><span className="font-semibold">Terminal:</span> Terminal 3, Aeropuerto Panamá</div> */}
                            </div>
                            <div className="col-span-full grid-cols-2 grid pb-4 pt-10">
                                <div><span className="font-semibold">Número de vuelo:</span> {travelData.MarketingCarrierInfo.CarrierDesigCode}{travelData.MarketingCarrierInfo.MarketingCarrierFlightNumberText}</div>
                                <div><span className="font-semibold">Operado por:</span> {travelData.MarketingCarrierInfo.CarrierDesigCode}</div>
                                {/* <div><span className="font-semibold">Avión:</span> Airbus 320</div> */}
                            </div>
                        </div>
                        <hr className="hrGeneral my-5" />
                        <div>
                            <h3 className="text-lg font-semibold">Cabina {travelData.CabinType.CabinTypeName}</h3>
                            <div className="grid-cols-2 grid-rows-1 grid">
                                <div>
                                    <h1 className="font-semibold mb-3 mt-3 flex items-center"><small className="pr-2"><BaggageIncluded></BaggageIncluded></small> Equipaje incluido en su tarifa</h1>
                                    <div className="flex flex-col ml-8">
                                        <span className="my-1 flex items-center">Incluye equipaje personal <small className="px-2"><PersonalBaggageActive></PersonalBaggageActive></small></span>
                                        {baggage.includes("CARRY_ON") &&
                                            <span className="my-1 flex items-center">Incluye equipaje de mano <small className="px-2"><HandBaggageActive></HandBaggageActive></small></span>
                                        }
                                        {baggage.includes("BAGGAGE") &&
                                            <span className="my-1 flex items-center">Incluye equipaje de bodega <small className="px-2"><StoreBaggageActive></StoreBaggageActive></small></span>
                                        }
                                    </div>
                                </div>
                                <div>
                                    <h1 className="font-semibold mb-3 flex items-center"><small className="pr-2"><BaggageNotIncluded></BaggageNotIncluded></small> Equipaje no incluido en su tarifa</h1>
                                    <div className="flex flex-col ml-8">
                                        {!baggage.includes("CARRY_ON") &&
                                            <span className="my-1 flex items-center">No incluye equipaje de mano <small className="px-2"><HandBaggageInactive></HandBaggageInactive></small></span>
                                        }
                                        {!baggage.includes("BAGGAGE") &&
                                            <span className="my-1 flex items-center">No incluye equipaje de bodega <small className="px-2"><StoreBaggageInactive></StoreBaggageInactive></small></span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </GeneralContainer>
        </>
    );
};