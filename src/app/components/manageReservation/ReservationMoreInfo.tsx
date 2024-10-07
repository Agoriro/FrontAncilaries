"use client";
import { FC } from "react";
import { GeneralContainer } from "../generalContainer/GeneralContainer";
import { IconCash, IconDisability, IconFlight } from "../icons/Icons";


export const ReservationMoreInfo= () => {

    return (
        <div>
            <div className="text-xl font-semibold text-center w-full">
                <span>¿Qué más puede hacer con su reserva?</span>
            </div>
            <GeneralContainer width="w-full" height="h-fit-content" styleAditionals="bg-[#FFFFFF]" styleAditionalsSecond="flex flex-col w-full">
                <div className="grid-cols-3 grid">
                    <div className="flex items-center justify-center flex-col px-10">
                        <h1 className="text-base font-semibold text-avia-blue">Estado de su vuelo</h1>
                        <IconFlight></IconFlight>
                        <span className="text-center text-xs">Consulte el estado de su vuelo en cualquier momento y toda su información</span>
                    </div>
                    <div className="flex items-center justify-center flex-col px-10">
                        <h1 className="text-base font-semibold text-avia-blue">Asistencia especial</h1>
                        <IconDisability></IconDisability>
                        <span className="text-center text-xs">Si requiere asistencia especial, se le brindará acompañamiento para la misma</span>
                    </div>
                    <div className="flex items-center justify-center flex-col px-10">
                        <h1 className="text-base font-semibold text-avia-blue">Reembolsos</h1>
                        <IconCash></IconCash>
                        <span className="text-center text-xs">Conozca las políticas para solicitar un reembolso en caso de necesitarlo</span>
                    </div>
                </div>
            </GeneralContainer>
        </div>
    );
};