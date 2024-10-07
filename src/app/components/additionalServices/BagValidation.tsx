'use client';
import React, { use, useEffect, useRef, useState } from "react";
import { GeneralModal } from "@/app/components";
import { useSearchParams } from "next/navigation";
import { OriginDestList, Individual, Response, CurCode, IdentityDoc, EmailAddress } from '../../../types/manageReservation/ResponseDataModel';
import { formatPrice } from "@/app/(pages)/utils/formatPrice";
import { sendSuitcaseInformation } from "@/app/services/api";
import { RequestSuitcase } from "@/types";
import { BaggageInitialResponse, BaggageResponse, UnitPrice, Weight, ItineraryList, PaxList } from '../../../types/aditionalServices/baggageResponseModel';
import { CounterBaggages } from "./CounterBaggages";

interface Passenger {
    PAXID: string;
    PTC: string;
}

interface RQMaletas {
    RESERVA: string;
    PASAJEROS: Passenger[];
    CANALVENTA: {
        CANAL: string;
        IDVENDEDOR: string;
    };
    TRACKID: string;
}

interface BagValidationI {
    BaggageType: number | any;
    data: any;
    isLoading: boolean;
    maletasRs: BaggageResponse | any;
    activeModal: boolean;
    setActiveModal: React.Dispatch<React.SetStateAction<any>>;
}

export const BagValidation: React.FC<BagValidationI> = ({ BaggageType, data, isLoading, maletasRs, activeModal, setActiveModal }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [trayect, setTrayect] = useState("")
    const [pricesSelected, setPricesSelected] = useState<number[]>([])
    const [finalBaggages, setFinalBaggages] = useState(0)
    const [conditionerPrice, setConditionerPrice] = useState()
    const [jsonMaletasIda, setJsonMaletasIda] = useState<any[]>([])
    const [jsonMaletasVuelta, setJsonMaletasVuelta] = useState<any[]>([])
    const [allPassengers, setAllPassengers] = useState<any[]>([])
    const [itineraryData, setItineraryData] = useState<any[]>([])
    const [taxes, setTaxes] = useState<any[]>([])
    const [revisados, setRevisados] = useState<any[]>([])
    const [client, setClient] = useState<any[]>([])

    const json = {
        "RQ_PRODUCTO": {
            "RESERVA": "LA0354180XUHG",
            "TRACKID": "727e796a-00c2-429a-ad08-3e6e5326bb11",
            "CANAL": "B2T",
            "IDVENDEDOR": "daniel.quintero",
            "IDOFICINA": "0201721",
            "NOMBREOFICINA": "PLAZA AMERICAS",
            "IDPROVEDOR": "114",
            "PROVEDOR": "LATAM_NDC",
            "IDAEROLINEA": "LA",
            "AEROLINEA": "LATAM",
            "CLIENTE": {
                "DOCUMENTO": data?.PaxList[0].IdentityDoc[0].IdentityDocID,
                "NOMBRE": data?.PaxList[0].Individual.GivenName + " " + data?.PaxList[0].Individual.Surname
            },
            "PASAJEROS": allPassengers,
            "ITINERARIO": itineraryData,
            "IMPUESTOS": {
                "BASE_AMOUNT": 0,
                "PERCENTAGE_VALUE": 0,
                "AMOUNT_VALUE": 0,
                "CODIGO": "",
                "NOMBRE": "",
                "VALOR": ""
            },
            // "IMPUESTOS": taxes,
            "OFERTA":
            {
                "MALETAS": {
                    "IDA": jsonMaletasIda,
                    "VUELTA": jsonMaletasVuelta
                },
                "ASIENTOS": [],
                // "REVISADOS": revisados
                "REVISADOS": {
                    "OfferRefID": "",
                    "OfferItemRefID": "",
                    "PaxRefID": ""
                }
            },
            "CANALVENTA": {
                "CANAL": "POSTBOLIVAR",
                "IDVENDEDOR": "daniel.quintero"
            },
            "VALORES": {
                "BASE": "0",
                "TOTAL": finalBaggages
            }
        }
    }

    useEffect(() => {
        let total = 0;
        pricesSelected.forEach((price) => {
            total += price;
        });
        setFinalBaggages(total);

        if (data) {
            data.PaxList.map((passenger: any, counter: number) => {
                if(allPassengers.length >= data.PaxList.length) {
                    ""
                } else {
                    setAllPassengers((prevPassengers: any[]) => [...prevPassengers, {
                        "NOMBRE": passenger.Individual.GivenName + " " + passenger.Individual.Surname,
                        "ID": passenger.PTC,
                        "DOCUMENTO": passenger.IdentityDoc[0].IdentityDocID,
                        "TIPODOCUMENTO": passenger.IdentityDoc[0].IdentityDocTypeCode,
                        "CORREO": data.ContactListPassengers[counter].EmailAddress[0].EmailAddressText,
                        "TELEFONO": "+" + data.ContactListPassengers[counter].Phone[0].CountryDialingCode + " " + data.ContactListPassengers[counter].Phone[0].PhoneNumber,
                        "FECHANACIMIENTO": passenger.Birthdate,
                        "GENERO": "",
                        "NACIONALIDAD": passenger.IdentityDoc[0].IssuingCountryCode,
                        "DIRECCION": ""
                    }]);
                }
            });
            if(itineraryData.length >= data.ItineraryInfo.length) {
                ""
            } else {
                data.ItineraryInfo.map((itinerary: any) => {
                    setItineraryData((itineraryInfo: any[]) => [...itineraryInfo, {
                        "ORIGEN": itinerary.Dep.IATA_LocationCode,
                        "FECHAORIGEN": itinerary.Dep.AircraftScheduledDateTime.Value,
                        "NUMEROVUELO": itinerary.DatedOperatingLeg[0].CarrierAircraftType.CarrierAircraftTypeCode,
                        "AEROLINEA": itinerary.OperatingCarrierInfo.CarrierDesigCode,
                        "DESTINO": itinerary.Arrival.IATA_LocationCode,
                        "FECHADESTINO": itinerary.Arrival.AircraftScheduledDateTime.Value,
                        "CLASE": itinerary.CabinType.CabinTypeCode
                    }]);
                })
            }
        }

        const UpdateTrayect = async () => {
            if (data) {
                setTrayect(data?.OriginDestList[0].OriginCode + "_" + data?.OriginDestList[0].DestCode)
            }
        }
        UpdateTrayect();
    }, [data, pricesSelected, allPassengers.length, itineraryData.length]);


    let passengers;
    if (data) {
        passengers = data?.PaxList.length
    }

    return (
        <>{activeModal &&
            <GeneralModal width="[90%]" height="fit" tittle={BaggageType === 0 ? "Equipaje adicional (equipaje de mano)" : "Equipaje adicional (equipaje de bodega)"} setActiveModal={setActiveModal} activeModal={activeModal}>
                <section className="pt-6">
                    {isLoading &&
                        <div className="left-0 fixed top-0 w-full h-full flex justify-center items-center backdrop-blur-sm">
                            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div>
                    }
                    <div>
                        <button className={`bg-[#DDDDDD] p-3 mr-2 rounded-t-[3px] ${activeTab == 0 ? "border-t-2 border-avia-blue font-bold !bg-[#F2F2F2]" : ""}`} onLoad={() => { setTrayect(data?.OriginDestList[0].OriginCode + "_" + data?.OriginDestList[0].DestCode) }} onClick={() => { setActiveTab(0), setTrayect(data?.OriginDestList[0].OriginCode + "_" + data?.OriginDestList[0].DestCode) }}>{data?.OriginDestList[0].OriginCode} - {data?.OriginDestList[0].DestCode}</button>
                        <button className={`bg-[#DDDDDD] p-3 mr-2 rounded-t-[3px] ${activeTab == 1 ? "border-t-2 border-avia-blue font-bold !bg-[#F2F2F2]" : ""}`} onLoad={() => setTrayect(data?.OriginDestList[data?.OriginDestList.length - 1].OriginCode + "_" + data?.OriginDestList[data?.OriginDestList.length - 1].DestCode)} onClick={() => { setActiveTab(1), setTrayect(data?.OriginDestList[data?.OriginDestList.length - 1].OriginCode + "_" + data?.OriginDestList[data?.OriginDestList.length - 1].DestCode) }}>{data?.OriginDestList[data?.OriginDestList.length - 1].OriginCode} - {data?.OriginDestList[data?.OriginDestList.length - 1].DestCode}</button>
                    </div>
                    <div className="w-full bg-[#F2F2F2] grid grid-cols-12 mb-4 rounded-r-lg rounded-b-lg px-3 py-5">
                        <div className="border-r px-3 border-r-[#9c9c9c] grid grid-cols-2 col-span-6">
                            <div>
                                <h3 className="font-bold h-20">Pasajero</h3>
                                {maletasRs?.response.PaxList.map((passengerRs: any, i: number) =>
                                    <>
                                        {data?.PaxList.map((passengerURL: any, i: number) =>
                                            <div key={i} className="my-2.5">
                                                {passengerURL.PaxID === passengerRs.PaxID &&
                                                    <span className="capitalize mb-3">{passengerURL.Individual.GivenName} {passengerURL.Individual.Surname} {passengerURL.PTC == "ADT" ? "(Adulto)" : passengerURL.PTC == "CHD" ? "(Niño)" : "(Infante)"}</span>
                                                }
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold h-20">{BaggageType === 0 ? "Primera pieza adicional de 1 a 16kg (1 a 35lbs)" : "Primera pieza adicional de 1 a 23kg (1 a 50lbs)"}</h3>
                                    {maletasRs?.response.PaxList.map((passengerRs: any, counter1: number) =>
                                        <>
                                            {BaggageType === 0 ?
                                                <>
                                                    {maletasRs?.response.CarryOn.map((carryon: any, counter2: number) =>
                                                        <>
                                                            {carryon.PaxOfferList.map((PaxOffer: any, counter3: number) =>
                                                                <>
                                                                    {
                                                                        trayect && PaxOffer.PaxID === passengerRs.PaxID && carryon.PaxJourneyID === trayect &&
                                                                        <CounterBaggages
                                                                            key={counter1}
                                                                            contador={counter1}
                                                                            passengerRs={passengerRs}
                                                                            price={PaxOffer.offer[0] ? PaxOffer.offer[0].UnitPrice.TotalAmount : 0}
                                                                            currency={PaxOffer.offer[0] ? PaxOffer.offer[0].UnitPrice.CurCode : "COP"}
                                                                            weigth={PaxOffer.offer[0] ? PaxOffer.offer[0].bag.Weight[0].Max + PaxOffer.offer[0].bag.Weight[0].Unit + "(" + PaxOffer.offer[0].bag.Weight[1].Max + PaxOffer.offer[0].bag.Weight[1].Unit + ")" : "0kg (0lb)"}
                                                                            setPricesSelected={setPricesSelected}
                                                                            pricesSelected={pricesSelected}
                                                                            setConditionerPrice={setConditionerPrice}
                                                                            conditionerPrice={conditionerPrice}
                                                                            finalBaggages={finalBaggages}
                                                                            setFinalBaggages={setFinalBaggages}
                                                                            offerData={PaxOffer}
                                                                            setJsonMaletasIda={setJsonMaletasIda}
                                                                            setJsonMaletasVuelta={setJsonMaletasVuelta}
                                                                            baggageType={BaggageType}
                                                                            offerNumber={0}>
                                                                        </CounterBaggages>
                                                                    }
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                                :
                                                <>
                                                    {maletasRs?.response.Baggage.map((baggage: any, counter2: number) =>
                                                        <>
                                                            {baggage.PaxOfferList.map((PaxOffer: any, counter3: number) =>
                                                                <>
                                                                    {
                                                                        trayect && PaxOffer.PaxID === passengerRs.PaxID && baggage.PaxJourneyID === trayect &&
                                                                        <CounterBaggages
                                                                            key={counter1}
                                                                            contador={counter1}
                                                                            passengerRs={passengerRs}
                                                                            price={PaxOffer.offer[0] ? PaxOffer.offer[0].UnitPrice.TotalAmount : 0}
                                                                            currency={PaxOffer.offer[0] ? PaxOffer.offer[0].UnitPrice.CurCode : "COP"}
                                                                            weigth={PaxOffer.offer[0] ? PaxOffer.offer[0].bag.Weight[0].Max + PaxOffer.offer[0].bag.Weight[0].Unit + "(" + PaxOffer.offer[0].bag.Weight[1].Max + PaxOffer.offer[0].bag.Weight[1].Unit + ")" : "0kg (0lb)"}
                                                                            setPricesSelected={setPricesSelected}
                                                                            pricesSelected={pricesSelected}
                                                                            setConditionerPrice={setConditionerPrice}
                                                                            conditionerPrice={conditionerPrice}
                                                                            finalBaggages={finalBaggages}
                                                                            setFinalBaggages={setFinalBaggages}
                                                                            offerData={PaxOffer}
                                                                            setJsonMaletasIda={setJsonMaletasIda}
                                                                            setJsonMaletasVuelta={setJsonMaletasVuelta}
                                                                            baggageType={BaggageType}
                                                                            offerNumber={0}>
                                                                        </CounterBaggages>
                                                                    }
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            }
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="border-r px-3 border-r-[#9c9c9c] col-span-2">
                            <div className="flex flex-col">
                                <h3 className="font-bold h-20">{BaggageType === 0 ? "Segunda pieza adicional de 1 a 16kg (1 a 35lbs)" : "Segunda pieza adicional de 1 a 23kg (1 a 50lbs)"}</h3>
                                {maletasRs?.response.PaxList.map((passengerRs: any, counter1: number) =>
                                    <>
                                        {BaggageType === 0 ?
                                            <>
                                                {maletasRs?.response.CarryOn.map((carryon: any, counter2: number) =>
                                                    <>
                                                        {carryon.PaxOfferList.map((PaxOffer: any, counter3: number) =>
                                                            <>
                                                                {
                                                                    trayect && PaxOffer.PaxID === passengerRs.PaxID && carryon.PaxJourneyID === trayect &&
                                                                    <CounterBaggages
                                                                        key={counter1}
                                                                        contador={counter1}
                                                                        passengerRs={passengerRs}
                                                                        price={PaxOffer.offer[1] ? PaxOffer.offer[1].UnitPrice.TotalAmount : 0}
                                                                        currency={PaxOffer.offer[1] ? PaxOffer.offer[1].UnitPrice.CurCode : "COP"}
                                                                        weigth={PaxOffer.offer[1] ? PaxOffer.offer[1].bag.Weight[0].Max + PaxOffer.offer[1].bag.Weight[0].Unit + "(" + PaxOffer.offer[1].bag.Weight[1].Max + PaxOffer.offer[1].bag.Weight[1].Unit + ")" : "0kg (0lb)"}
                                                                        setPricesSelected={setPricesSelected}
                                                                        pricesSelected={pricesSelected}
                                                                        setConditionerPrice={setConditionerPrice}
                                                                        conditionerPrice={conditionerPrice}
                                                                        finalBaggages={finalBaggages}
                                                                        setFinalBaggages={setFinalBaggages}
                                                                        offerData={PaxOffer}
                                                                        setJsonMaletasIda={setJsonMaletasIda}
                                                                        setJsonMaletasVuelta={setJsonMaletasVuelta}
                                                                        baggageType={BaggageType}
                                                                        offerNumber={1}>
                                                                    </CounterBaggages>
                                                                }
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                            :
                                            <>
                                                {maletasRs?.response.Baggage.map((baggage: any, counter2: number) =>
                                                    <>
                                                        {baggage.PaxOfferList.map((PaxOffer: any, counter3: number) =>
                                                            <>
                                                                {
                                                                    trayect && PaxOffer.PaxID === passengerRs.PaxID && baggage.PaxJourneyID === trayect &&
                                                                    <CounterBaggages
                                                                        key={counter1}
                                                                        contador={counter1}
                                                                        passengerRs={passengerRs}
                                                                        price={PaxOffer.offer[1] ? PaxOffer.offer[1].UnitPrice.TotalAmount : 0}
                                                                        currency={PaxOffer.offer[1] ? PaxOffer.offer[1].UnitPrice.CurCode : "COP"}
                                                                        weigth={PaxOffer.offer[1] ? PaxOffer.offer[1].bag.Weight[0].Max + PaxOffer.offer[1].bag.Weight[0].Unit + "(" + PaxOffer.offer[1].bag.Weight[1].Max + PaxOffer.offer[1].bag.Weight[1].Unit + ")" : "0kg (0lb)"}
                                                                        setPricesSelected={setPricesSelected}
                                                                        pricesSelected={pricesSelected}
                                                                        setConditionerPrice={setConditionerPrice}
                                                                        conditionerPrice={conditionerPrice}
                                                                        finalBaggages={finalBaggages}
                                                                        setFinalBaggages={setFinalBaggages}
                                                                        offerData={PaxOffer}
                                                                        setJsonMaletasIda={setJsonMaletasIda}
                                                                        setJsonMaletasVuelta={setJsonMaletasVuelta}
                                                                        baggageType={BaggageType}
                                                                        offerNumber={1}>
                                                                    </CounterBaggages>
                                                                }
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        }
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="border-r px-3 border-r-[#9c9c9c] grid col-span-2">
                            <div className="flex flex-col">
                                <h3 className="font-bold h-20">{BaggageType === 0 ? "Tercera pieza adicional de 1 a 16kg (1 a 35lbs)" : "Tercera pieza adicional de 1 a 23kg (1 a 50lbs)"}</h3>
                                {maletasRs?.response.PaxList.map((passengerRs: any, counter1: number) =>
                                    <>
                                        {BaggageType === 0 ?
                                            <>
                                                {maletasRs?.response.CarryOn.map((carryon: any, counter2: number) =>
                                                    <>
                                                        {carryon.PaxOfferList.map((PaxOffer: any, counter3: number) =>
                                                            <>
                                                                {
                                                                    trayect && PaxOffer.PaxID === passengerRs.PaxID && carryon.PaxJourneyID === trayect &&
                                                                    <CounterBaggages
                                                                        key={counter1}
                                                                        contador={counter1}
                                                                        passengerRs={passengerRs}
                                                                        price={PaxOffer.offer[2] ? PaxOffer.offer[2].UnitPrice.TotalAmount : 0}
                                                                        currency={PaxOffer.offer[2] ? PaxOffer.offer[2].UnitPrice.CurCode : "COP"}
                                                                        weigth={PaxOffer.offer[2] ? PaxOffer.offer[2].bag.Weight[0].Max + PaxOffer.offer[2].bag.Weight[0].Unit + "(" + PaxOffer.offer[2].bag.Weight[1].Max + PaxOffer.offer[2].bag.Weight[1].Unit + ")" : "0kg (0lb)"}
                                                                        setPricesSelected={setPricesSelected}
                                                                        pricesSelected={pricesSelected}
                                                                        setConditionerPrice={setConditionerPrice}
                                                                        conditionerPrice={conditionerPrice}
                                                                        finalBaggages={finalBaggages}
                                                                        setFinalBaggages={setFinalBaggages}
                                                                        offerData={PaxOffer}
                                                                        setJsonMaletasIda={setJsonMaletasIda}
                                                                        setJsonMaletasVuelta={setJsonMaletasVuelta}
                                                                        baggageType={BaggageType}
                                                                        offerNumber={2}>
                                                                    </CounterBaggages>
                                                                }
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                            :
                                            <>
                                                {maletasRs?.response.Baggage.map((baggage: any, counter2: number) =>
                                                    <>
                                                        {baggage.PaxOfferList.map((PaxOffer: any, counter3: number) =>
                                                            <>
                                                                {
                                                                    trayect && PaxOffer.PaxID === passengerRs.PaxID && baggage.PaxJourneyID === trayect &&
                                                                    <CounterBaggages
                                                                        key={counter1}
                                                                        contador={counter1}
                                                                        passengerRs={passengerRs}
                                                                        price={PaxOffer.offer[2] ? PaxOffer.offer[2].UnitPrice.TotalAmount : 0}
                                                                        currency={PaxOffer.offer[2] ? PaxOffer.offer[2].UnitPrice.CurCode : "COP"}
                                                                        weigth={PaxOffer.offer[2] ? PaxOffer.offer[2].bag.Weight[0].Max + PaxOffer.offer[2].bag.Weight[0].Unit + "(" + PaxOffer.offer[2].bag.Weight[1].Max + PaxOffer.offer[2].bag.Weight[1].Unit + ")" : "0kg (0lb)"}
                                                                        setPricesSelected={setPricesSelected}
                                                                        pricesSelected={pricesSelected}
                                                                        setConditionerPrice={setConditionerPrice}
                                                                        conditionerPrice={conditionerPrice}
                                                                        finalBaggages={finalBaggages}
                                                                        setFinalBaggages={setFinalBaggages}
                                                                        offerData={PaxOffer}
                                                                        setJsonMaletasIda={setJsonMaletasIda}
                                                                        setJsonMaletasVuelta={setJsonMaletasVuelta}
                                                                        baggageType={BaggageType}
                                                                        offerNumber={2}>
                                                                    </CounterBaggages>
                                                                }
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        }
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="px-3 grid col-span-2">
                            <div className="flex flex-col">
                                <h3 className="font-bold h-20">{BaggageType === 0 ? "Cuarta pieza adicional de 1 a 16kg (1 a 35lbs)" : "Cuarta pieza adicional de 1 a 23kg (1 a 50lbs)"}</h3>
                                {maletasRs?.response.PaxList.map((passengerRs: any, counter1: number) =>
                                    <>
                                        {BaggageType === 0 ?
                                            <>
                                                {maletasRs?.response.CarryOn.map((carryon: any, counter2: number) =>
                                                    <>
                                                        {carryon.PaxOfferList.map((PaxOffer: any, counter3: number) =>
                                                            <>
                                                                {
                                                                    trayect && PaxOffer.PaxID === passengerRs.PaxID && carryon.PaxJourneyID === trayect &&
                                                                    <CounterBaggages
                                                                        key={counter1}
                                                                        contador={counter1}
                                                                        passengerRs={passengerRs}
                                                                        price={PaxOffer.offer[3] ? PaxOffer.offer[3].UnitPrice.TotalAmount : 0}
                                                                        currency={PaxOffer.offer[3] ? PaxOffer.offer[3].UnitPrice.CurCode : "COP"}
                                                                        weigth={PaxOffer.offer[3] ? PaxOffer.offer[3].bag.Weight[0].Max + PaxOffer.offer[3].bag.Weight[0].Unit + "(" + PaxOffer.offer[3].bag.Weight[1].Max + PaxOffer.offer[3].bag.Weight[1].Unit + ")" : "0kg (0lb)"}
                                                                        setPricesSelected={setPricesSelected}
                                                                        pricesSelected={pricesSelected}
                                                                        setConditionerPrice={setConditionerPrice}
                                                                        conditionerPrice={conditionerPrice}
                                                                        finalBaggages={finalBaggages}
                                                                        setFinalBaggages={setFinalBaggages}
                                                                        offerData={PaxOffer}
                                                                        setJsonMaletasIda={setJsonMaletasIda}
                                                                        setJsonMaletasVuelta={setJsonMaletasVuelta}
                                                                        baggageType={BaggageType}
                                                                        offerNumber={3}>
                                                                    </CounterBaggages>
                                                                }
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                            :
                                            <>
                                                {maletasRs?.response.Baggage.map((baggage: any, counter2: number) =>
                                                    <>
                                                        {baggage.PaxOfferList.map((PaxOffer: any, counter3: number) =>
                                                            <>
                                                                {
                                                                    trayect && PaxOffer.PaxID === passengerRs.PaxID && baggage.PaxJourneyID === trayect &&
                                                                    <CounterBaggages
                                                                        key={counter1}
                                                                        contador={counter1}
                                                                        passengerRs={passengerRs}
                                                                        price={PaxOffer.offer[3] ? PaxOffer.offer[3].UnitPrice.TotalAmount : 0}
                                                                        currency={PaxOffer.offer[3] ? PaxOffer.offer[3].UnitPrice.CurCode : "COP"}
                                                                        weigth={PaxOffer.offer[3] ? PaxOffer.offer[3].bag.Weight[0].Max + PaxOffer.offer[3].bag.Weight[0].Unit + "(" + PaxOffer.offer[3].bag.Weight[1].Max + PaxOffer.offer[3].bag.Weight[1].Unit + ")" : "0kg (0lb)"}
                                                                        setPricesSelected={setPricesSelected}
                                                                        pricesSelected={pricesSelected}
                                                                        setConditionerPrice={setConditionerPrice}
                                                                        conditionerPrice={conditionerPrice}
                                                                        finalBaggages={finalBaggages}
                                                                        setFinalBaggages={setFinalBaggages}
                                                                        offerData={PaxOffer}
                                                                        setJsonMaletasIda={setJsonMaletasIda}
                                                                        setJsonMaletasVuelta={setJsonMaletasVuelta}
                                                                        baggageType={BaggageType}
                                                                        offerNumber={3}>
                                                                    </CounterBaggages>
                                                                }
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        }
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-[#F2F2F2] flex rounded-lg flex-col px-3 pb-5 pt-2">
                        <h3 className="pl-2 pt-2 font-bold mb-3">Su reserva</h3>
                        <div className="grid grid-cols-2">
                            <div className="border-r px-3 border-r-[#9c9c9c] grid items-center h-12">
                                <div className="flex justify-between w-full">
                                    <span className="font-bold">Cantidad de pasajeros</span>
                                    <span>{passengers && passengers > 1 ? passengers + " pasajeros" : passengers + " pasajero"}</span>
                                </div>
                                {/* <div className="flex justify-between">
                                    <span className="font-bold">Sus servicios</span>
                                    <span>683.900</span>
                                </div> */}
                            </div>
                            <div className="px-3 grid items-center h-12">
                                <div className="flex justify-between w-full">
                                    <span className="font-bold">Total equipaje adicional</span>
                                    <span>{finalBaggages ? formatPrice(finalBaggages, data?.TotalAmount.CurCode) : "0 COP"}</span>
                                </div>
                            </div>
                            <div className="pt-4 px-3 flex flex-col">
                                <h3 className="font-bold">Total (con equipaje adicional)</h3>
                                <span className="text-sm font-medium">{finalBaggages ? formatPrice(finalBaggages, data?.TotalAmount.CurCode) : "0 COP"}</span>
                                <button className="text-avia-blue text-base font-medium w-fit mt-2">Continuar</button>
                            </div>
                        </div>
                    </div>
                </section>
            </GeneralModal>
        }

        </>
    )
}
