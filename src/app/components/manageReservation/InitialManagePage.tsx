"use client";
import {
    GeneralContainer, AdditionalInformation, PaymentInformation, PassengerInformation, TravelPersonalization, InfoTravel, ReservationMoreInfo, ApprovedIcon
} from "@/app/components";
import { ClientData, ResponseData, RequestSuitcase, Pasajero,UrlInfo } from "@/types";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useEffect, useState,  Suspense  } from "react";

import { ModalError } from "../general/ModalError";
import { sendReservationInformation, sendSuitcaseInformation } from '../../services/api/';

const Loading = () => <div>Cargando...</div>;



const InitialManage = () => {
    const searchParam = useSearchParams();
    const [loginData, setLoginData] = useState<ClientData>();
    const [reservationData, setReservationData] = useState<ResponseData>();
    const [stateResponse, setStateResponse] = useState("");

    const reservation = searchParam.get('reservation');

    useEffect(() => {
        const fetchData = async () => {
            if (reservation && typeof reservation === "string") {
                try {

                    const desencrypt = atob(reservation);
                    
                    
                    const dataFormat = JSON.parse(desencrypt);
                    dataFormat.RQDATA.RESERVA.PROVEDOR = '';
                    dataFormat.RQDATA.RESERVA.DOCUMENTO = '';
                    dataFormat.RQDATA.RESERVA.IDPROVEDOR = '';
                    dataFormat.RQDATA.CANALVENTA.IDOFICINA = '';
                    dataFormat.RQDATA.CANALVENTA.URLRETORNO = '';
                    dataFormat.RQDATA.CANALVENTA.NOMBREOFICINA = '';
                    
                    setLoginData(dataFormat);
                    const result = await sendReservationInformation(dataFormat);
                    result.success ? setStateResponse("1") : setStateResponse("0")
                    const resultFormat = JSON.parse(result.data)
                    setReservationData(resultFormat);
                }
                catch {
                    console.log("error decoding json");
                    setStateResponse("0")
                }
            }
        }
        fetchData();
    }, []);
    try{
        
        const initialDataClient: ClientData = {
            RQDATA: {
                RESERVA: {
                    PNR: '',
                    PAX: '',
                    AEROLINEA: '',
                    PROVEDOR: '',
                    DOCUMENTO: '',
                    IDPROVEDOR: ''
                },
                CANALVENTA: {
                    CANAL: '',
                    IDVENDEDOR: '',
                    IDOFICINA: '',
                    URLRETORNO: '',
                    NOMBREOFICINA: ''
                }

            }
        }

        setLoginData(initialDataClient);



        const emissionDate = moment(reservationData?.Response.Order[0].OrderItem[0].CreationDateTime.Value).format('DD/MM/YYYY');
        
        return (
            <>
                {stateResponse == "0" ?
                    <ModalError></ModalError>
                    :
                    <div className="px-36 py-10 bg-[#D6D6D6]/[13%] text-[ubuntu] text-general">
                        <h2 className="text-xxl flex justify-center font-bold text-[#585858]">Administre su reserva</h2>
                        <p className="text-sm flex justify-center text-center mt-3">Personalice su vuelo a su gusto. Agregue equipaje, elja su asiento y modifique su vuelo fácilmente. Además, descubra más opciones para hacer su viaje aún más especial.</p>
                        {/* <GeneralContainer width="80%" height="4vh"> <GeneralContainer/> */}
                        <GeneralContainer width="60%" height="20vh" styleAditionals="flex relative justify-center bg-[#FFFFFF] w-full" styleAditionalsSecond="w-full">
                            <h3 className="text-xl font-semibold text-center">Información de reserva</h3>
                            <div className="grid-cols-3 grid-rows-2 grid">
                                <div className="my-5 mx-5">
                                    <span>Código de reserva: {reservationData?.Response.Order[0].OrderID}</span>
                                </div>
                                <div className="my-5 mx-5">
                                    <span className="mr-1 flex items-center">Estado de reserva: {reservationData?.Response.Order[0].StatusCode === 0 && "Cerrado"} <small className="px-1"><ApprovedIcon></ApprovedIcon></small></span>
                                </div>
                                <div className="my-5 mx-5">
                                    <span>Fecha de emisión: {emissionDate}</span>
                                </div>
                                <div className="my-5 mx-5">
                                    <span>Número de contacto: +{reservationData?.Response.DataLists.ContactInfoList[0].Phone[0].CountryDialingCode} {reservationData?.Response.DataLists.ContactInfoList[0].Phone[0].PhoneNumber}</span>
                                </div>
                                <div className="my-5 mx-5">
                                    <span>Email: {reservationData?.Response.DataLists.ContactInfoList[0].EmailAddress[0].EmailAddressText}</span>
                                </div>
                            </div>
                        </GeneralContainer>
                        <InfoTravel travelDataInitial={reservationData?.Response.DataLists.PaxSegmentList} baggageData={reservationData?.Response.DataLists.ServiceDefinitionList}></InfoTravel>
                        <TravelPersonalization reservationData={reservationData} loginData={loginData}></TravelPersonalization>
                        {/* <ReservationMoreInfo ></ReservationMoreInfo> */}
                        <PassengerInformation passengersData={reservationData?.Response.DataLists.PaxList} tickets={reservationData?.Response.TicketDocInfo}></PassengerInformation>
                        <PaymentInformation allData={reservationData}></PaymentInformation>
                        <AdditionalInformation ></AdditionalInformation>
                    </div>
                }
            </>
        );
    }catch (error) {
        return <div>Error al cargar los parámetros de búsqueda.</div>;
      }
};

const InitialManagePage = () => {
    return (
      <Suspense fallback={<Loading />}>
        <InitialManage />
      </Suspense>
    );
  };

export default InitialManagePage;