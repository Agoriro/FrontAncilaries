"use client";
import { FC, useState } from "react";
import { PaxSegmentList, ServiceDefinitionList } from "@/types";
import { CardInfoTravel } from "./CardInfoTravel";

interface Props {
    travelDataInitial: PaxSegmentList | any;
    baggageData: ServiceDefinitionList | any;
}

export const InfoTravel: FC<Props> = ({ travelDataInitial, baggageData }) => {

    return (
        <div>
            <div className="text-xl font-semibold text-center w-full">
                <span>Información de viaje</span>
            </div>
            <span><span className="font-semibold">Importante:</span> Esta información puede contener escalas</span>
            {travelDataInitial && travelDataInitial.map((data: any, i: any) =>
                <div key={i}>
                    <CardInfoTravel travelData={data} baggage={baggageData[i].ServiceDefinitionID} counter={i}></CardInfoTravel>
                </div>
            )
            }
        </div>
    );
};