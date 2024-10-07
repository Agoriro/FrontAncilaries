"use client";
import { FC, useEffect, useState } from "react";
import Link from 'next/link';
import {
    GeneralContainer, GeneralModal, Assistance, ComfortAreas, ExtraBaggage, FlightChanges, PickSeat, HandBaggage, HoldBaggage, PassengerIcon,FlightList,
} from "@/app/components"
import { ResponseData, ClientData, RequestSuitcase, Pasajero, UrlInfo,PassengerCount, SeatsAvailability } from "@/types";
import { sendSuitcaseInformation } from '../../services/api/';
// import { SeatSelection } from '../seats/PassengerSeats';

import { sendSeatsInformation } from "../../services/api/getSeats";


interface Props {
    reservationData: ResponseData | any;
    loginData: ClientData | any;
}

export const TravelPersonalization: FC<Props> = ({ reservationData, loginData }) => {
    const [activeModal, setActiveModal] = useState(false);
    const [activeModalSeats, setActiveModalSeats] = useState(false);
    const [typeBaggage, setTypeBaggage] = useState(0);
    const [dispoSillas, setdispoSillas] = useState<SeatsAvailability[]>([]);

    const paxList = reservationData?.Response.DataLists.PaxList;
    const OriginDestList = reservationData?.Response.DataLists.OriginDestList;
    const TotalAmount = reservationData?.Response.Order[0].TotalPrice.TotalAmount;
    const pasajeros = reservationData?.Response.DataLists.PaxList;
    const itinerary = reservationData?.Response.DataLists.PaxSegmentList;
    const contactList = reservationData?.Response.DataLists.ContactInfoList;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const suitCaseRQ: UrlInfo = {
        "RQ_MALETAS": {
            "RESERVA": `${loginData.RQDATA.RESERVA.PNR}`,
            "PASAJEROS": [],
            "CANALVENTA": {
                "CANAL": `${loginData.RQDATA.CANALVENTA.CANAL ? loginData.RQDATA.CANALVENTA.CANAL : "Dato sin registro"}`,
                "IDVENDEDOR": `${loginData.RQDATA.CANALVENTA.IDVENDEDOR ? loginData.RQDATA.CANALVENTA.IDVENDEDOR : "Dato sin registro"}`,
                "IDOFICINA": "",
                "NOMBREOFICINA": "",
                "URLRETORNO":""
            },
            "TRACKID": `${reservationData?.MessageDoc.Name}`
        },
        "PaxList":
            paxList,
        "TypeBagage":
            typeBaggage,
        "ItineraryInfo":
            itinerary,
        "OriginDestList":
            OriginDestList,
        "ContactListPassengers":
            contactList,
        "TotalAmount":
            TotalAmount


    }
    
    const suitCaseSeatRQ: ClientData = {
        "RQDATA":{
            "RESERVA":{
                "PNR":`${loginData.RQDATA.RESERVA.PNR}`,
                "PAX": `${loginData.RQDATA.RESERVA.PAX}`,
                "AEROLINEA": `${loginData.RQDATA.RESERVA.AEROLINEA}`,
                "PROVEDOR" : "",
                "DOCUMENTO" : "",
                "IDPROVEDOR" : ""
            },
            "CANALVENTA" :{
                "CANAL": `${loginData.RQDATA.CANALVENTA.CANAL ? loginData.RQDATA.CANALVENTA.CANAL : "Dato sin registro"}`,
                "IDVENDEDOR": `${loginData.RQDATA.CANALVENTA.IDVENDEDOR ? loginData.RQDATA.CANALVENTA.IDVENDEDOR : "Dato sin registro"}`,
                "IDOFICINA" : "",
                "URLRETORNO" : "",
                "NOMBREOFICINA" : ""
            }
        }

    }


    
    pasajeros?.forEach((e: any) => {
        suitCaseRQ.RQ_MALETAS.PASAJEROS.push({
            "PAXID": e.PaxID,
            "PTC": e.PTC
        })
    })

    const handleSubmiteSeats = async (suitCaseRQ: ClientData) => {

        
        const result = await sendSeatsInformation(suitCaseRQ);
        const dispoResult = JSON.parse(result.data)
        //
        //const dispoSlice = dispoResult.slice(0,50)
        //console.log(dispoSlice);
        setdispoSillas(dispoResult);
        setActiveModalSeats(true);
    }


    const [encodeRq, setEncodeRq] = useState("")

    useEffect(() => {

        if (suitCaseRQ.RQ_MALETAS.PASAJEROS.length !== 0) {
            const urlCodificada = btoa(JSON.stringify(suitCaseRQ));
            setEncodeRq(urlCodificada);
        }
    }, [suitCaseRQ])



    return (
        <div>
            <div className="text-xl font-semibold mt-24">
                <span>Personalice su viaje</span>
            </div>
            <div className="grid-cols-3 auto-rows-auto grid gap-x-24 pb-5">
                {/* <GeneralContainer width="w-full" height="" styleAditionals="items-center justify-center flex bg-[#C6C6C6] text-[#757575]" styleAditionalsSecond="">
                    <div className="flex flex-col text-center items-center filter contrast-50">
                        <FlightChanges></FlightChanges>
                        <h1 className="text-lg font-semibold my-1">Cambios en su vuelo</h1>
                        <span className="text-xs">Cambie la hora y fecha de su vuelo de manera ilimitada</span>
                        <button disabled className="font-semibold mt-5">Comprar</button>
                    </div>
                </GeneralContainer> */}
                <GeneralContainer width="w-full" height="" styleAditionals="items-center justify-center flex" styleAditionalsSecond="">
                    <div className="flex flex-col text-center items-center filter">
                        <ExtraBaggage></ExtraBaggage>
                        <h1 className="text-lg font-semibold my-1">Equipaje extra</h1>
                        <span className="text-xs">Añada equipaje extra a su vuelo cuando lo necesite</span>
                        <button className="text-avia-blue font-semibold mt-5 cursor-pointer" onClick={() => (setActiveModal(true))}>Añadir</button>

                    </div>
                </GeneralContainer>
                {
                    activeModal &&
                    <GeneralModal height="fit" width="[90%]" styleAditionals="" tittle="Equipaje adicional" setActiveModal={setActiveModal} activeModal={activeModal}>
                        <div>
                            <h2 className="text-s">Elija la opción que se ajuste a sus necesidades en un click</h2>
                            <div className="w-[100%] flex">
                                <GeneralContainer width="w-[50%]" height="" styleAditionals="color-split__modal m-[10px]" styleAditionalsSecond="flex">
                                    <div className="w-[35%]">
                                        <HandBaggage></HandBaggage>
                                    </div>
                                    <div className="w-[65%] flex flex-col">
                                        <h1 className="text-sm font-bold">Equipaje de mano</h1>
                                        <span className="text-s">1 a 16kg (1 a 35lbs)</span>
                                        <span className="text-s">Llévalo a la cabina del avión, debe caber debajo del asiento</span>
                                        <Link href={`/additionalServices?data=${encodeRq}`}>
                                            <button className="text-avia-blue font-semibold mt-5 cursor-pointer" onClick={() => setTypeBaggage(0)}>Añadir</button>
                                        </Link>

                                    </div>
                                </GeneralContainer>
                                <GeneralContainer width="w-[50%]" height="" styleAditionals="color-split__modal m-[10px]" styleAditionalsSecond="flex">
                                    <div className="w-[35%]">
                                        <HoldBaggage></HoldBaggage>
                                    </div>
                                    <div className=" w-[65%] flex flex-col">
                                        <h1 className="text-sm font-bold">Equipaje de bodega</h1>
                                        <span className="text-s">1 a 23kg (1 a 50lbs)</span>
                                        <span className="text-s">Nuestro personal se encarga de llevar tu equipaje seguro</span>
                                        <Link href={`/additionalServices?data=${encodeRq}`}>
                                            <button className="text-avia-blue font-semibold mt-5 cursor-pointer" onClick={() => setTypeBaggage(1)}>Añadir</button>
                                        </Link>
                                    </div>
                                </GeneralContainer>
                            </div>
                        </div>
                    </GeneralModal>

                }
                
                <GeneralContainer width="w-full" height="" styleAditionals="items-center justify-center flex" styleAditionalsSecond="">
                    <div className="flex flex-col text-center items-center filter contrast-50">
                        <PickSeat></PickSeat>
                        <h1 className="text-lg font-semibold my-1">Elija su asiento</h1>
                        <span className="text-xs">Viaje en el asiento más cómodo para usted</span>

                        <button className="text-avia-blue font-semibold mt-5 cursor-pointer" onClick={() => (handleSubmiteSeats(suitCaseSeatRQ))}>Elegir</button>
                    </div>
                </GeneralContainer>
                {
                    activeModalSeats &&
                    <GeneralModal height="h-[90vh]" width="w-[95%]" styleAditionals="max-w-8xl" tittle="Sillas adicionales" setActiveModal={setActiveModalSeats} activeModal={activeModalSeats}>
                        <FlightList originDestList = {OriginDestList}  seatsAvailability = {dispoSillas} passengers = {pasajeros}></FlightList>
                    </GeneralModal>

                }
                {/* <GeneralContainer width="w-full" height="" styleAditionals="items-center justify-center flex bg-[#C6C6C6] text-[#757575]" styleAditionalsSecond="">
                    <div className="flex flex-col text-center items-center filter contrast-50">
                        <ComfortAreas></ComfortAreas>
                        <h1 className="text-lg font-semibold my-1">Ingreso a zonas cómodas</h1>
                        <span className="text-xs">Espere la hora de su vuelo relajado y cómodo</span>
                        <button disabled className="font-semibold mt-5">Comprar</button>
                    </div>
                </GeneralContainer> */}
                {/* <GeneralContainer width="w-full" height="" styleAditionals="items-center justify-center flex bg-[#C6C6C6] text-[#757575]" styleAditionalsSecond="">
                    <div className="flex flex-col text-center items-center filter contrast-50">
                        <Assistance></Assistance>
                        <h1 className="text-lg font-semibold my-1">Asistencia</h1>
                        <span className="text-xs">Asistencia médica para usted en todo momento</span>
                        <button disabled className="font-semibold mt-5">Comprar</button>
                    </div>
                </GeneralContainer> */}
            </div>
        </div>
    );
};