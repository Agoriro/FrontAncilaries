"use client";
import { FC, useState } from "react";
import { PaxSegmentList } from "@/types";
import { GeneralModal } from "../generalModal/GeneralModal";
import { IconError } from "../icons/Icons";

export const ModalError: FC = () => {

    const [collapseInfoTravel, setCollapseInfoTravel] = useState(false);
    const [activeModal, setActiveModal] = useState(true)

    return (
        <div>
            {activeModal &&
                <GeneralModal height="fit" width="[60%]" styleAditionals="" tittle="¡Oops! Algo ha fallado" setActiveModal={setActiveModal} activeModal={activeModal} error={true}>
                    <div className="flex flex-col justify-center items-center mt-10">
                        <IconError></IconError>
                        <div className="mt-8">Lo sentimos, ha ocurrido un error</div>
                        <button className="text-avia-blue font-semibold cursor-pointer text-sm mt-4" onClick={() => {window.location.href = `/`;}}>Reintentar búsqueda</button>
                    </div>
                </GeneralModal>
            }
        </div>
    );
};