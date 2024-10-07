"use client";
import { FC, useState } from "react";
import {GeneralContainer,ArrowDown, ArrowUp, IconAdditionalInfo } from "@/app/components"

export const AdditionalInformation = () => {

    const [collapsePassangerInfo, setCollapsePassangerInfo] = useState(false);

    return (
        <div>
            <GeneralContainer width="w-full" height="h-fit-content" styleAditionals="bg-[#FFFFFF] px-6 py-6 mt-20" styleAditionalsSecond="flex flex-col w-full">
                <div className="flex justify-between">
                    <div className="flex items-center text-lg font-semibold">
                        Ten en cuenta antes de tu vuelo
                    </div>
                    <a className="items-center flex cursor-pointer" onClick={() => setCollapsePassangerInfo(!collapsePassangerInfo)}>
                        <span className="flex items-center font-semibold text-avia-blue">{collapsePassangerInfo ? "Ocultar detalle" : "Ver detalle"} {collapsePassangerInfo ? <small className="px-2"><ArrowUp></ArrowUp></small> : <small className="px-2"><ArrowDown></ArrowDown></small>}</span>
                    </a>
                </div>
                <div className={`collapse-container ${collapsePassangerInfo ? "open" : "closed"}`}>
                    <div className="px-6 py-3">
                        <div className="flex">
                            <small className="px-2"><IconAdditionalInfo></IconAdditionalInfo></small>
                            <p>Las autoridades, tanto en el origen como en el destino, pueden abrir y requisar tu equipaje, aun cuando este haya sido plastificado y sin que para ello sea necesaria tu presencia. Conoce nuestra política de equipajes.</p>
                        </div>
                    </div>
                    <div className="px-6 py-3">
                        <div className="flex">
                            <small className="px-2"><IconAdditionalInfo></IconAdditionalInfo></small>
                            <p>Por tu seguridad y la de todos los pasajeros, está prohibido el transporte de elementos catalogados como artículos restringidos.</p>
                        </div>
                    </div>
                    <div className="px-6 py-3">
                        <div className="flex">
                            <small className="px-2"><IconAdditionalInfo></IconAdditionalInfo></small>
                            <p>Conoce los servicios adicionales que puedes incluir en tu viaje. La disponibilidad de los productos y servicios puede variar dependiendo de tu origen, destino o canal de venta.</p>
                        </div>
                    </div>
                    <div className="px-6 py-3">
                        <div className="flex">
                            <small className="px-2"><IconAdditionalInfo></IconAdditionalInfo></small>
                            <p>Si necesitas una asistencia especial, solicita el servicio mínimo 24 horas antes de la salida programada de tu vuelo.</p>
                        </div>
                    </div>
                    <div className="px-6 py-3">
                        <div className="flex">
                            <small className="px-2"><IconAdditionalInfo></IconAdditionalInfo></small>
                            <p>Los trayectos de ida y regreso debes volarlos en orden consecutivo. De no ser así, se cancelará automáticamente la totalidad del itinerario.</p>
                        </div>
                    </div>
                    <div className="px-6 py-3">
                        <div className="flex">
                            <small className="px-2"><IconAdditionalInfo></IconAdditionalInfo></small>
                            <p>Para vuelos en código compartido aplican las políticas de Avianca. Para trayectos interlínea debes tener en cuenta las políticas de la aerolínea que opera tu vuelo. Revísalas con anticipación, debido a que pueden presentarse cambios de último momento ajenos a nuestro control.</p>
                        </div>
                    </div>
                    <div className="px-6 py-3">
                        <div className="flex">
                            <small className="px-2"><IconAdditionalInfo></IconAdditionalInfo></small>
                            <p>Consulta el contrato de transporte.</p>
                        </div>
                    </div>
                </div>
            </GeneralContainer>
        </div>
    );
};