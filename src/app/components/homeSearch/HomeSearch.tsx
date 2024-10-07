"use client";
// import mappings from "@/app/config/mapping";
import { ClientData } from "@/types"
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState, Suspense } from "react";


const Loading = () => <div>Cargando...</div>;

const HomeSearchIni = () => {
    const searchParam = useSearchParams();
    const login = searchParam.get('login');
    const initialDataClient: ClientData = {
        RQDATA: {
            RESERVA: {
                PNR: '',
                PAX: '',
                AEROLINEA: '',
                PROVEDOR : '',
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
    const [changeAirline, setChangeAirline] = useState('');
    const [changeLastName, setChangeLastName] = useState('');
    const [changeReservation, setChangeReservation] = useState('');
    const [clientData, setClientData] = useState<ClientData>(initialDataClient);
    const [isLoading, setIsLoading] = useState(false)

    //Se obtiene de la url y se procesa la información
    useEffect(() => {
        const fetchData = async () => {
            if (login && typeof login === "string") {
                try {
                    const desencrypt = atob(login);
                    const dataFormat = JSON.parse(desencrypt);
                    setClientData(dataFormat);
                }
                catch {
                    console.log("error decoding json");
                }
            }
        }
        fetchData();
    }, [login]);
    
    
    //Se controla el autollenado de los input
    useEffect(() => {
        if (clientData) {
            setChangeAirline(clientData.RQDATA.RESERVA.AEROLINEA);
            setChangeLastName(clientData.RQDATA.RESERVA.PAX);
            setChangeReservation(clientData.RQDATA.RESERVA.PNR);
        }
    }, [clientData])

    //Se controla la alteración del autollenado
    const handleChangeAirline = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeAirline(e.target.value);
    }
    const handleChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeLastName(e.target.value);
    }
    const handleChangeReservation = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeReservation(e.target.value);
    }

    const handleSendDataClient = async () => {
        setIsLoading(true)
        const result = {"success":true}
        console.log(result,"homesearch result");
        if(result.success){
            if (login && typeof login === "string") {
                window.location.href = `/manageReservation?reservation=${login}`;
            } else {
                initialDataClient.RQDATA.RESERVA.PNR = changeReservation
                initialDataClient.RQDATA.RESERVA.PAX = changeLastName
                initialDataClient.RQDATA.RESERVA.AEROLINEA = changeAirline
                window.location.href = `/manageReservation?reservation=${btoa(JSON.stringify(initialDataClient))}`;
            }
        } else {
            setIsLoading(false)
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="w-[50%] h-fit bg-[#FFFFFF] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] rounded-lg p-16 items-center flex flex-col text-[#585858]">
            {isLoading &&
                <div className="left-0 fixed top-0 w-full h-full flex justify-center items-center backdrop-blur-sm">
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            }
            <h3 className="text-xl font-bold text-center">Administre su reserva</h3>
            <span className="w-[90%] flex items-center text-center text-sm mb-3">
                Personalice su vuelo a su gusto. Agregue equipaje, elija su asiento y modifique su vuelo fácilmente. Además, descubra más opciones para hacer su viaje aún más especial.
            </span>
            <h1 className="text-base font-semibold mb-6">Ingrese la información de su vuelo</h1>
            <div className="grid-cols-2 grid mb-8 justify-between w-full">
                <div className="w-full mb-6">
                    <span className="font-semibold">Código de reserva</span>
                    <input
                        value={changeReservation}
                        onChange={handleChangeReservation}
                        type="text"
                        className="h-12 p-4 w-[90%] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] rounded-lg"
                        pattern="^[a-zA-Z0-9]{4,40}$"
                        required
                    />
                </div>
                <div className="w-full mb-6">
                    <span className="font-semibold">Apellidos</span>
                    <input
                        value={changeLastName}
                        onChange={handleChangeLastName}
                        type="text"
                        className="h-12 p-4 w-[90%] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] rounded-lg"
                        pattern="^[a-zA-Z\s]{4,40}$"
                        required
                    />
                </div>
                <div className="w-full">
                    <span className="font-semibold">Aerolínea</span>
                    <input
                        value={changeAirline}
                        onChange={handleChangeAirline}
                        type="text"
                        className="h-12 p-4 w-[90%] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] rounded-lg"
                        pattern="^[a-zA-Z\s]{2,4}$"
                        required
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <button className="mr-16" onClick={() => window.history.back()}>Volver</button>
                <button type="submit" className={(changeReservation && changeAirline && changeLastName) ? "cursor-pointer bg-avia-blue text-[white] p-3 rounded-lg font-semibold" : "cursor-default bg-[#DADADA] text-[white] p-3 rounded-lg font-semibold"} disabled={changeAirline && changeLastName && changeReservation ? false : true} onClick={handleSendDataClient}>Administre su reserva</button>
            </div>
        </form>
    );
};

const HomeSearch = () => {
    return (
      <Suspense fallback={<Loading />}>
        <HomeSearchIni />
      </Suspense>
    );
  };

export default HomeSearch;