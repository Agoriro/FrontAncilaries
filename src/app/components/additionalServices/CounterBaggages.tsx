'use client';
import React, { useEffect, useState } from "react";
import { formatPrice } from "@/app/(pages)/utils/formatPrice";
import { PaxOfferList } from "@/types/aditionalServices/baggageResponseModel";

interface CounterBaggage {
    contador: number;
    passengerRs: any;
    price: number;
    currency: string;
    weigth: string;
    pricesSelected: any;
    conditionerPrice: any;
    setPricesSelected: React.Dispatch<React.SetStateAction<number[]>>;
    setConditionerPrice: React.Dispatch<React.SetStateAction<any>>;
    finalBaggages: any;
    setFinalBaggages: React.Dispatch<React.SetStateAction<number>>;
    offerData: PaxOfferList;
    setJsonMaletasIda: React.Dispatch<React.SetStateAction<any[]>>;
    setJsonMaletasVuelta: React.Dispatch<React.SetStateAction<any[]>>;
    baggageType: number;
    offerNumber: number;
}

export const CounterBaggages: React.FC<CounterBaggage> = ({ contador, passengerRs, price, currency, weigth, pricesSelected, conditionerPrice, setPricesSelected, setConditionerPrice, finalBaggages, setFinalBaggages, offerData, setJsonMaletasIda, setJsonMaletasVuelta, baggageType, offerNumber }) => {

    const [counterBaggage, setCounterBaggage] = useState(0);
    let formattedTotalAmount;
    if (currency) {
        formattedTotalAmount = formatPrice(price, currency);
    }

    const addingPrice = (priceSelected: number, dataOffer: PaxOfferList) => {
        setPricesSelected((prevItems: number[]) => [...prevItems, priceSelected]);
        if (baggageType === 0) {
            setJsonMaletasIda((prevDataIda: any[]) => [...prevDataIda, {
                "OfferRefID": dataOffer.offer[offerNumber].OfferItemID,
                "OfferItemRefID": dataOffer.offer[offerNumber].ServiceID,
                "PaxRefID": dataOffer.PaxID,
                "ValorOferta": {
                    "BASE": dataOffer.offer[offerNumber].UnitPrice.BaseAmount,
                    "IMPUESTOS": 0,
                    "TOTAL": dataOffer.offer[offerNumber].UnitPrice.TotalAmount
                }
            }]);
        } else {
            setJsonMaletasVuelta((prevDataVuelta: any[]) => [...prevDataVuelta, {
                "OfferRefID": dataOffer.offer[offerNumber].OfferItemID,
                "OfferItemRefID": dataOffer.offer[offerNumber].ServiceID,
                "PaxRefID": dataOffer.PaxID,
                "ValorOferta": {
                    "BASE": dataOffer.offer[offerNumber].UnitPrice.BaseAmount,
                    "IMPUESTOS": 0,
                    "TOTAL": dataOffer.offer[offerNumber].UnitPrice.TotalAmount
                }
            }]);
        }
    };

    const removingPrice = (priceSelected: number, dataOffer: PaxOfferList, offerRefId: string) => {
        setPricesSelected(prevPrices => {
            const index = prevPrices.findIndex(price => price === priceSelected);
            if (index !== -1) {
                return [
                    ...prevPrices.slice(0, index),
                    ...prevPrices.slice(index + 1)
                ];
            }
            return prevPrices;
        });
        if(baggageType === 0) {
            setJsonMaletasIda(prevDataIda => {
                const indexIda = prevDataIda.findIndex(data => data.OfferRefID === offerRefId);
                if (indexIda !== -1) {
                    return [
                        ...prevDataIda.slice(0, indexIda),
                        ...prevDataIda.slice(indexIda + 1)
                    ];
                }
                return prevDataIda;
            });
        } else {
            setJsonMaletasVuelta(prevDataVuelta => {
                const indexVuelta = prevDataVuelta.findIndex(data => data.OfferRefID === offerRefId);
                if (indexVuelta !== -1) {
                    return [
                        ...prevDataVuelta.slice(0, indexVuelta),
                        ...prevDataVuelta.slice(indexVuelta + 1)
                    ];
                }
                return prevDataVuelta;
            });
        }
    };

    const maxSeats = offerData.offer[offerNumber] ? offerData.offer[offerNumber].CantidadMax : 1;

    return (
        <div className="flex items-center justify-evenly">
            <div className="flex items-center">
                <button
                    className={`text-sm ${passengerRs.PTC == "INF" || counterBaggage == 0 ? "text-[#DDDDDD]" : "text-avia-blue"}`}
                    disabled={passengerRs.PTC == "INF" || price === 0 || counterBaggage == 0 ? true : false}
                    onClick={() => {
                        setCounterBaggage(counterBaggage - 1);
                        removingPrice(price, offerData, offerData.offer[offerNumber].OfferItemID);
                    }}>
                    -
                </button>
                <span className={`px-2 font-semibold text-xs ${price === 0 && "text-[#DDDDDD]"}`}>{counterBaggage}</span>
                <button
                    className={`text-sm ${counterBaggage == 1 || price === 0 || passengerRs.PTC == "INF" ? "text-[#DDDDDD]" : "text-avia-blue"}`}
                    disabled={passengerRs.PTC == "INF" || price === 0 || counterBaggage == maxSeats ? true : false}
                    onClick={() => {
                        addingPrice(price, offerData);
                        setCounterBaggage(counterBaggage + 1);
                    }}>
                    +</button>
            </div>
            {formattedTotalAmount &&
                <div className="flex flex-col text-center text-[#8d8d8d] text-[13px]">
                    <span>{formattedTotalAmount}</span>
                    <span className="text-[11px]">{weigth}</span>
                </div>
            }
        </div>
    )
}
