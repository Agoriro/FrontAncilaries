export interface SeatsAvailability {
    Column: string
    idSeat: string
    OccupationStatus: string
    OfferItem: OfferItem[]
    Route: string
    Row: string
    SeatCharacteristicCode: string
    ServiceID: string
    TotalAmount: number
  }
  
  export interface OfferItem {
    OfferItemRefID: string
    PaxRefID: string
  }