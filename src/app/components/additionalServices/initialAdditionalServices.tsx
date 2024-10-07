'use client';
import { GeneralContainer, IconFlightPoints, IconMiniFlight, BagValidation, EquipajeMano, EquipajeDeportivo, SalasVIP, ReservaAsientos, ServiciosEspeciales, EquipajeBodega } from "@/app/components";
import { compliments } from "@/app/json";
import { sendSuitcaseInformation } from "@/app/services/api";
import { OriginDestList, PaxList, RqMaletas } from "@/types";
import { BaggageResponse } from "@/types/aditionalServices/baggageResponseModel";
import { Span } from "next/dist/trace";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

interface Data {
    RQ_MALETAS: RqMaletas;
    PaxList: PaxList[];  // Define further as needed
    OriginDestList: OriginDestList[];// Define further as needed
    TotalAmount: any;  // Define further as needed
    TypeBaggage: number;
}
const Loading = () => <div>Cargando...</div>;

const InitialAdditionalServ = () => {

    const [data, setData] = useState<Data | null>(null)
    const [maletasRs, setMaletasRs] = useState<BaggageResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [activeModal, setActiveModal] = useState(true);
    const searchParam = useSearchParams();
    const dataUrl = searchParam.get('data');

    useEffect(() => {
        const fetchData = async () => {
            if (dataUrl && typeof dataUrl === "string") {
                try {
                    const desencrypt = atob(dataUrl);
                    const dataFormat = JSON.parse(desencrypt);
                    setData(dataFormat);
                    // const dataRq = data?.RQ_MALETAS;
                    const dataRq = { RQ_MALETAS: { ...dataFormat?.RQ_MALETAS } }
                    if (dataRq.RQ_MALETAS.PASAJEROS) {
                        const result = await sendSuitcaseInformation(dataRq);
                        if (result.success) {
                            setIsLoading(false)
                        }
                        const resultFormat = JSON.parse(result.data);
                        setMaletasRs(resultFormat);
                    }
                }
                catch {
                    console.log("error decoding json");
                }
            }
        }
        fetchData();
    }, [dataUrl]);

    console.log(maletasRs, 'maletasRs')
    const [activeModalBaggage, setActiveModalBaggage] = useState(data ? data?.TypeBaggage : 0);
    console.log(activeModalBaggage, "Estado la maleta")
    let passangerArray: any[] = []
    data?.PaxList.forEach(element => {
        if (element.PTC === "ADT") {
            const adult = 0
            const adultCount = adult + 1;
            console.log(adultCount, "número de adultos")
            if (adultCount > 0) {
                let objetAdult = { "Count": adultCount > 1 ? (adultCount + " Adultos") : (adultCount + " Adulto") }
                passangerArray.push(objetAdult);
                // adultCount > 1 ? passangerArray.push(adultCount +" Adultos"):passangerArray.push(adultCount +"Adulto");
            }
        }
        if (element.PTC === "CHD") {
            const child = 0
            const childCount = child + 1;
            console.log(childCount, "número de niños")
            if (childCount > 0) {
                let objetChild = { "Count": childCount > 1 ? (childCount + " Niños") : (childCount + " Niño") }
                console.log("objeto de niños", objetChild)
                passangerArray.push(objetChild);
                // childCount > 1 ? passangerArray.push():passangerArray.push(childCount +"Niños");
            }
        }
        if (element.PTC === "INF") {
            const infant = 0
            const infantCount = infant + 1;
            console.log(infantCount, "número de infantes")
            if (infantCount > 0) {
                let objetInfant = { "Count": infantCount > 1 ? (infantCount + " Infante") : (infantCount + " Infante") }
                passangerArray.push(objetInfant);
                // infantCount > 1 ? passangerArray.push(infantCount +" Infante"):passangerArray.push(infantCount +" Infante");

            }
        }
        // console.log(element.PTC.length,(element.PTC === "ADT")? `${"Adulto"}`: (element.PTC === "CHD") ? "Niño": (element.PTC === "INF") ? "Infante":"otro")
    });
    // console.log(passangerArray)
    return (
        <main className="px-20 py-10 bg-[#D6D6D6]/[13%] text-[ubuntu] text-general">
            {/* {activeModalBaggage === 0 || activeModalBaggage === 1 &&
                <BagValidation BaggageType={activeModalBaggage} data={data} isLoading={isLoading} maletasRs={maletasRs}>
                </BagValidation>
            } */}
            {/* {activeModalBaggage === 1 &&
                <BagValidation BaggageType={activeModalBaggage} data={data} isLoading={isLoading} maletasRs={maletasRs}>
                </BagValidation>
            } */}
            <BagValidation BaggageType={activeModalBaggage} data={data} isLoading={isLoading} maletasRs={maletasRs} activeModal={activeModal} setActiveModal={setActiveModal}>
            </BagValidation>

            <span className="text-xxl font-bold">Elija complementos para su viaje</span>
            <div className="flex">

                <div className="grid-cols-2 auto-rows-auto grid gap-x-6 w-[60%] mr-12 items-center">
                    {
                        compliments.map((compliment, i) => (
                            <GeneralContainer key={i} width="w-[100%]" height="h-[85%]" styleAditionals={compliment.ServiceName == "Equipaje de mano" || compliment.ServiceName == "Equipaje de bodega" ? "bg-[#FFFFFF] px-6 py-6 !mb-0" : "bg-[#C6C6C6] text-[#757575] px-6 py-6 !mb-0"} styleAditionalsSecond="flex flex-col h-full justify-between items-center">
                                <div className="flex flex-col text-center">
                                    <span className="text-sm font-medium">{compliment.ServiceName}</span>
                                    <span className="text-s">{compliment.Subtittle}</span>
                                </div>
                                {compliment.ServiceName == "Equipaje de mano" ?
                                    <EquipajeMano></EquipajeMano>
                                    : compliment.ServiceName == "Equipaje de bodega" ?
                                        <EquipajeBodega></EquipajeBodega>
                                        : compliment.ServiceName == "Equipaje deportivo" ?
                                            <EquipajeDeportivo></EquipajeDeportivo>
                                            : compliment.ServiceName == "Salas VIP" ?
                                                <SalasVIP></SalasVIP>
                                                : compliment.ServiceName == "Reserva tu asiento" ?
                                                    <ReservaAsientos></ReservaAsientos>
                                                    :
                                                    <ServiciosEspeciales></ServiciosEspeciales>
                                }
                                <button onClick={() => {
                                    compliment.ServiceName == "Equipaje de mano" ? setActiveModalBaggage(0) : compliment.ServiceName == "Equipaje de bodega" && setActiveModalBaggage(1);
                                    setActiveModal(!activeModal);
                                }}
                                    className={compliment.ServiceName == "Equipaje de mano" || compliment.ServiceName == "Equipaje de bodega" ? "py-2 px-6 bg-avia-blue text-[#FFFFFF] rounded-lg w-[60%] font-medium" : "py-2 px-6 bg-[#C6C6C6] filter contrast-50 text-[#757575] rounded-lg w-[60%] font-medium"}>Agregar</button>
                            </GeneralContainer>
                        ))
                    }
                </div>
                <div className="w-[35%]">
                    <GeneralContainer width="w-[100%]" height="h-fit-content" styleAditionals="bg-[#FFFFFF] px-6 py-6" styleAditionalsSecond="">
                        <div className="flex flex-col w-full text-center items-center mb-12">
                            <h1 className="text-lg font-semibold mb-3">Tu selección</h1>
                            <h1 className="text-base font-medium">{data?.PaxList.length} Pasajeros</h1>

                            {passangerArray.length != 0 &&
                                <>
                                {console.log(passangerArray, "en foreach")}
                                    {passangerArray.map((element, index) => (
                                        <span key={index}> {element?.Count}</span>
                                    ))

                                    }
                                </>

                            }
                            {/* <span>1 adulto</span>
                            <span>1 infante</span> */}
                        </div>
                        <div className="flex flex-col w-full text-center items-center mb-12">
                            <IconMiniFlight></IconMiniFlight>
                            <span className="font-semibold">Vuelo de ida</span>
                            <span className="mb-4">25 febrero 2024</span>
                            <span><span className="font-semibold">08:40</span> Bogotá (BOG)</span>
                            <span><span className="font-semibold">10:20</span> Panamá City (PTY)</span>
                            <span>Duración total 1h 5m, vuelo directo</span>
                        </div>
                        <div className="flex flex-col w-full text-center items-center mb-12">
                            <IconMiniFlight></IconMiniFlight>
                            <span className="font-semibold">Vuelo de vuelta</span>
                            <span className="mb-4">25 febrero 2024</span>
                            <span><span className="font-semibold">08:40</span> Bogotá (BOG)</span>
                            <span><span className="font-semibold">10:30</span> Panamá City (PTY)</span>
                            <span>Duración total 1h 5m, vuelo directo</span>
                        </div>
                        <div className="flex flex-col mb-12">
                            <span className="text-center font-semibold">Servicios</span>
                            <span className="text-end mb-6">COP <span className="font-semibold">312.400,00</span></span>
                            <div className="flex justify-between w-full">
                                <span>Total anterior</span>
                                <span>COP <span className="font-semibold">1.604.680,00</span></span>
                            </div>
                            <div className="flex justify-between w-full mb-6">
                                <span>Total nuevo</span>
                                <span>COP <span className="font-semibold">1.604.680,00</span></span>
                            </div>
                            <div className="flex justify-between w-full">
                                <span className="font-semibold">Saldo</span>
                                <span>COP <span className="font-semibold">0,00</span></span>
                            </div>
                        </div>
                        <button className="py-2 px-6 bg-avia-blue text-[#FFFFFF] rounded-lg w-full font-medium">Continuar</button>
                    </GeneralContainer>
                </div>
            </div>
            <div className="w-[60%]">
                {/* px-6 py-6 */}
                <GeneralContainer width="w-[100%]" height="h-fit-content" styleAditionals="bg-[#FFFFFF] p-0 mt-20" styleAditionalsSecond="flex flex-col w-full">
                    <div className="px-6 py-4 bg-[#F2F2F2] font-semibold">Servicios</div>
                    <div className="px-6 py-6">
                        <div className="mb-10">
                            <div className="flex items-center text-sm mb-4">
                                <span className="font-semibold">Bogotá</span>
                                <small className="px-6"><IconFlightPoints></IconFlightPoints></small>
                                <span className="font-semibold">Panamá City</span>
                            </div>
                            <span>25 febrero 2024</span>
                            <span>Equipaje adicional seleccionado</span>
                            <div className="flex justify-between">
                                <span>1 x Primera pieza adicional 1 a 23 kg (1 a 50 lbs)</span>
                                <span>COP 156.200,00</span>
                            </div>
                        </div>
                        <div className="mb-10">
                            <div className="flex items-center text-sm mb-4">
                                <span className="font-semibold">Bogotá</span>
                                <small className="px-6"><IconFlightPoints></IconFlightPoints></small>
                                <span className="font-semibold">Panamá City</span>
                            </div>
                            <span>25 febrero 2024</span>
                            <span>Equipaje adicional seleccionado</span>
                            <div className="flex justify-between">
                                <span>1 x Primera pieza adicional 1 a 23 kg (1 a 50 lbs)</span>
                                <span>COP 156.200,00</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-base font-semibold">
                            <span>Ya pagado</span>
                            <span>COP 312.400,00</span>
                        </div>
                    </div>
                </GeneralContainer>
            </div>
        </main>
    )
};

const InitialAdditionalServices = () => {
    return (
      <Suspense fallback={<Loading />}>
        <InitialAdditionalServ />
      </Suspense>
    );
  };

export default InitialAdditionalServices;