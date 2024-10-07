"use client";
import { IATA } from "@/app/json";
import { FlightProps } from "../../../types/Flight/FlightProps";
import '../../styles/flight/flightList.css'
import '../../styles/seats/seatsMap.css';
import '../../styles/passenger/passenger.css';
import { FC, useState, useEffect } from "react";
import { SeatsAvailability } from "../../../types/Flight/SeatsAvailability";
import React from "react";
import { PassengerCount } from "../../../types/passengers/passengerCount";
import { SeatSelect } from "../../../types/Flight/SeatsSelect";
import { PassengerIcon,IconPassanger, } from "@/app/components"
import { Passenger } from "../../../types/passengers/Passenger";
import { IconX } from "../icons/Icons";

export const FlightList: React.FC<FlightProps> = ({ originDestList, seatsAvailability, passengers }) => {
    const [selectedAirport, setSelectedAirport] = useState(originDestList[0].OriginCode + '_' + originDestList[0].DestCode);
    const [filteredSeats, setFilteredSeats] = useState<SeatsAvailability[]>([]);
    const [selectedSeat, setSelectedSeat] = useState<SeatSelect[]>([]);
    const [seatRow, setSeatRow] = useState<string[]>([]);

    const [seatTotalAmount, setseatTotalAmount] = useState(0);

    const columns = ['A', 'B', 'C', 'D', 'E', 'F']

    

    const getCityName = (iataCode: string): string => {

        const found = IATA.find((item) => item.iata === iataCode);

        return found ? found.city : iataCode;
        //return iataCode;
    };

    const countPassengers = (pasajeros: Passenger[]): PassengerCount => {
        if (!pasajeros) {
            return { Adultos: 0, Niños: 0, Infantes: 0 };
        }

        return pasajeros.reduce(
            (acc, passenger) => {
                switch (passenger.PTC) {
                    case 'ADT':
                        acc.Adultos += 1;
                        break;
                    case 'CHD':
                        acc.Niños += 1;
                        break;
                    case 'INF':
                        acc.Infantes += 1;
                        break;
                    default:
                        break;
                }
                return acc;
            },
            { Adultos: 0, Niños: 0, Infantes: 0 }
        );
    };

    const { Adultos, Niños, Infantes } = countPassengers(passengers);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAirport(event.target.value);
    };

    useEffect(() => {
        
        //const array = JSON.parse(seatsAvailability);
        const filtered = seatsAvailability.filter(seat => seat.Route === selectedAirport);
        setFilteredSeats(filtered);
        setSeatRow(Array.from(new Set(filtered.map(seat => seat.Row))).sort((a, b) => Number(a) - Number(b)))

    }, [selectedAirport,seatsAvailability])

    useEffect(() => {

        setseatTotalAmount(selectedSeat.reduce((acc, seat) => acc + seat.TotalAmount, 0));
    },[selectedSeat])

    // Función para ordenar los asientos
    const sortedSeats = filteredSeats.sort((a, b) => {
        const rowA = parseInt(a.Row, 10);
        const rowB = parseInt(b.Row, 10);
        if (rowA !== rowB ) return rowA - rowB ;
        return a.Column.localeCompare(b.Column);
    });

    // Función para manejar el clic en un asiento
    const handleSeatClick = (seat: SeatsAvailability| undefined) => {
        if (seat?.OccupationStatus === 'Available') {

            const unassignedPassenger = passengers.find((passenger) => {
                return !selectedSeat.some(
                  (seatS) => seatS.Passenger.IdentityDoc === passenger.IdentityDoc && seatS.Route === seat.Route
                );
              });


            if (unassignedPassenger){
                if (unassignedPassenger.PTC !== 'INF'){
                    const offerItem = seat.OfferItem.find(item => item.PaxRefID === unassignedPassenger.PaxID);
                    const newSeat: SeatSelect = {
                        Passenger: unassignedPassenger,
                        Route: seat.Route,
                        Seat: seat.Row + seat.Column,
                        OfferItemRefID: offerItem ? offerItem.OfferItemRefID : "",
                        ServiceID: seat.ServiceID,
                        TotalAmount: seat.TotalAmount,
                        };
        
                        setSelectedSeat((prevSelectedSeats) => [...prevSelectedSeats, newSeat]);

                }
            }
        }
    };

    const handleRemoveSeat = (passengerF: Passenger) => {

        setSelectedSeat((prevSelectedSeat) => 
            prevSelectedSeat.filter((seatF) => seatF.Passenger.IdentityDoc !== passengerF.IdentityDoc || seatF.Route !== selectedAirport)
        );
    };

    return (

        <><div className="w-full max-w-5xl max-h-lg bg-blue-900 rounded-lg md:p-6">
            <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
                <h2 className="text-lg font-bold">Selección de asientos</h2>
                <button className="text-gray-500 hover:text-red-500">Cerrar</button>
            </div>
            <div className="flex flex-col lg:flex-row w-full h-full space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="w-full lg:w-1/2 border-2 p-4 rounded-lg bg-white">
                    <div className="">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-bold mb-2">Pasajeros</h3>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mb-2">
                                    {/* <PassengerIcon /> */}
                                    <IconPassanger />
                                </div>
                                <div className="text-sm">
                                    {Adultos > 0 && `${Adultos} Adultos`}
                                    {Niños > 0 && ` - ${Niños} Niños`}
                                    {Infantes > 0 && ` - ${Infantes} Infantes`}
                                </div>
                            </div>
                            <div>
                                <div className="max-h-[300px] overflow-y-auto">
                                    {passengers.map((passenger, index) => (
                                    <div className="flex items-center justify-between p-2 border mb-2 cursor-pointer hover:bg-blue-100 rounded" key={index}>
                                        <div className="flex items-center flex-grow">
                                        <div className="passenger-avatar mr-2 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold">
                                            {passenger.Individual.GivenName[0][0]}
                                            {passenger.Individual.Surname[0][0]}
                                        </div>

                                        <div className="passenger-info flex-grow">
                                            <div className="passenger-name text-sm font-medium">
                                            {passenger.Individual.GivenName.join(' ')} {passenger.Individual.Surname} ({passenger.PTC}) 
                                            </div>
                                            {passenger.PTC !== 'INF' && (
                                            <div className="passenger-seat text-xs text-gray-600">
                                                {selectedSeat.find(
                                                (seat) => 
                                                    seat.Passenger.IdentityDoc === passenger.IdentityDoc && 
                                                    seat.Route === selectedAirport
                                                )?.Seat || 'Sin seleccionar asiento'}
                                            </div>
                                            )}
                                        </div>
                                        </div>

                                        {passenger.PTC !== 'INF' && (
                                        <button 
                                            className="remove-seat text-red-500 font-bold px-2 py-1 ml-2 hover:bg-red-100 rounded" 
                                            onClick={() => handleRemoveSeat(passenger)}
                                        >
                                            X
                                        </button>
                                        )}
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 border-2 p-4 lg:p-8 flex flex-col items-center rounded-lg bg-white">
                    <div className="flight-list w-full mb-4">
                        <select
                            id="airport-select"
                            value={selectedAirport}
                            onChange={handleSelectChange}
                            className="w-full p-2 border rounded"
                        >
                            {originDestList.map((flight, index) => (

                                <option key={index} value={flight.OriginCode + '_' + flight.DestCode}>
                                    <div key={index} className="flight-item">
                                        <div className="flight-icon">✈️</div>
                                        <div className="flight-details">
                                            <span>{`Vuelo ${index + 1} de ${originDestList.length} `}</span>

                                            <span>
                                                <strong>{getCityName(flight.OriginCode)}</strong> ({flight.OriginCode}) a{' '}
                                                <strong>{getCityName(flight.DestCode)}</strong> ({flight.DestCode})
                                            </span>
                                        </div>
                                    </div>
                                </option>

                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col items-center p-4 w-full ">
                        <div className="flex justify-center mb-2 min-w-max">
                            {columns.map((column, index) => (
                            <React.Fragment key={column}>
                                <div className="w-10 sm:w-12 h-8 flex items-center justify-center font-bold mx-1 sm:mx-2">
                                {column}
                                </div>
                                {index === 2 && <div className="w-10 sm:w-12" />}
                            </React.Fragment>
                            ))}
                        </div>
                        <div className="max-h-[500px] overflow-y-auto min-w-max">
                        {seatRow.map(row => (
                            <div key={row} className="flex mb-2">
                            {columns.map((column, index) => {
                                const seat = filteredSeats.find(s => s.Row === row && s.Column === column)
                                const isAvailable = seat?.OccupationStatus === 'Available'
                                const isUnavailable = seat?.OccupationStatus === 'Unavailable'
                                const seatType = seat?.SeatCharacteristicCode
                                const isSelected = selectedSeat.some(
                                    (item) => item.Seat === row + column && item.Route === seat?.Route
                                );

                                return (
                                <React.Fragment key={`${row}${column}`}>
                                    <div
                                    className={`w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center border rounded-lg mx-1 sm:mx-2 text-xs sm:text-sm cursor-pointer ${
                                        isSelected? 'bg-[#84CC16] text-avia-blue':
                                        isAvailable ? 'bg-avia-blue text-white ' :
                                        isUnavailable ? 'bg-[#6B7280] text-gray-500 ' : 'bg-white'
                                        
                                    }`}
                                        onClick={() => handleSeatClick(seat)}>
                                    {selectedSeat
                                        .filter(
                                            (seatS) => seatS.Seat === row + column && seatS.Route === seat?.Route
                                        )
                                        .map((seatF, index) => (
                                            <div key={index}>
                                                {seatF.Passenger.Individual.GivenName[0][0]}{' '}
                                                {seatF.Passenger.Individual.Surname[0][0]}
                                            </div>
                                        ))}
                                    </div>
                                    {index === 2 && (
                                    <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center font-bold">
                                        {row}
                                    </div>
                                    )}
                                </React.Fragment>
                                )
                            })}
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between mt-4 border-t-2 pt-2 text-white">
                <p className="mb-2 sm:mb-0">Valor Asiento(s) seleccionados: {seatTotalAmount.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-avia-blue text-[#ffffff] rounded hover:bg-blue-700 transition duration-300">Continuar con el pago</button>
                </div>
              </div>
        </div>
        </>

    );
};

