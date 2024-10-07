"use client";
import { FC, useState } from "react";
import { GeneralContainer } from "../generalContainer/GeneralContainer";
import { ArrowDown, ArrowUp, IconFlightPointsBlue, IconPassanger } from "../icons/Icons";
import { PaxList, TicketDocInfo } from "@/types";

interface Props {
    passengersData: PaxList | any;
    tickets: TicketDocInfo | any;
}

export const PassengerInformation: FC<Props> = ({ passengersData, tickets }) => {

    const [collapsePassangerInfo, setCollapsePassangerInfo] = useState(false);
    const counterTypePassenger = {
        ADT: 0,
        CHD: 0,
        INF: 0,
    };

    return (
        <div>
            <GeneralContainer width="w-full" height="h-fit-content" styleAditionals="bg-[#FFFFFF] px-6 py-6 mt-20" styleAditionalsSecond="flex flex-col w-full">
                <div className="flex justify-between">
                    <div className="flex items-center text-lg font-semibold">
                        Información de pasajeros
                    </div>
                    <a className="items-center flex cursor-pointer" onClick={() => setCollapsePassangerInfo(!collapsePassangerInfo)}>
                        <span className="flex items-center font-semibold text-avia-blue">{collapsePassangerInfo ? "Ocultar detalle" : "Ver detalle"} {collapsePassangerInfo ? <small className="px-2"><ArrowUp></ArrowUp></small> : <small className="px-2"><ArrowDown></ArrowDown></small>}</span>
                    </a>
                </div>
                <div className={`collapse-container ${collapsePassangerInfo ? "open" : "closed"}`}>
                    <div className="px-6 pt-6 grid-cols-2 auto-rows-auto grid gap-12">
                        {passengersData ? passengersData.map((passenger: PaxList, i: number) => {
                            passenger.PTC === "ADT" ?
                            counterTypePassenger.ADT = counterTypePassenger.ADT + 1
                            : passenger.PTC === "CHD" ?
                            counterTypePassenger.CHD = counterTypePassenger.CHD + 1
                            :
                            counterTypePassenger.INF = counterTypePassenger.INF + 1
                            return (
                                <div key={i}>
                                    <div className="flex items-center">
                                        <IconPassanger></IconPassanger>
                                        <div className="ml-8">
                                            <h1 className="text-sm font-semibold">{passenger?.Individual.GivenName} {passenger?.Individual.Surname}</h1>
                                            <span className="capitalize">{passenger.PTC == "ADT" ? `Adulto ${counterTypePassenger.ADT}` : passenger.PTC == "CHD" ? `Niño ${counterTypePassenger.CHD}` : `Infante ${counterTypePassenger.INF}`}</span>
                                        </div>
                                    </div>
                                    <hr className="hrGrey my-4" />
                                    <div>
                                        <div>
                                            <h1 className="text-sm font-semibold">Número de tiquete</h1>
                                            <span>{tickets[i].BookingRef[0].BookingID}</span>
                                        </div>
                                        <div>
                                            <h1 className="text-sm font-semibold">Número de reserva</h1>
                                            <span>{tickets[i].Ticket[0].TicketNumber}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )
                            :
                            ''}
                    </div>
                </div>
            </GeneralContainer>
        </div>
    );
};