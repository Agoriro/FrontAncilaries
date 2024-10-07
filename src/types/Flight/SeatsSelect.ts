import { Passenger } from '../passengers/Passenger';

export interface SeatSelect {
    Passenger : Passenger
    Route: string
    Seat: string
    OfferItemRefID: string
    ServiceID: string
    TotalAmount: number
}