export interface BaggageInitialResponse {
    success: boolean;
    message: string;
    data:    string;
}

export interface BaggageResponse {
    response: Response;
}

export interface Response {
    TrackId:        string;
    ItineraryList:  ItineraryList[];
    ItineraryClear: ItineraryClear[];
    PaxList:        PaxList[];
    CarryOn:        Baggage[];
    Baggage:        Baggage[];
}

export interface Baggage {
    PaxJourneyID: string;
    PaxOfferList: PaxOfferList[];
}


export interface PaxOfferList {
    PaxID: string;
    PTC:   string;
    offer: Offer[];
}

export interface Offer {
    CantidadMax: number;
    CancelRestrictions:     string;
    DatedOperatingLegRefID: string;
    PaxRefID:               string;
    OfferItemID:            string;
    ServiceDefinitionRefID: string;
    ServiceID:              string;
    ServiceRefID:           string;
    UnitPrice:              UnitPrice;
    bag:                    Bag;
}
export interface UnitPrice {
    CurCode:     string;
    BaseAmount:  number;
    TotalAmount: number;
}


export interface Bag {
    Name:                  string;
    ServiceCode:           string;
    BaggageAllowanceRefID: BaggageAllowanceRefID;
    ServiceDefinitionID:   string;
    ApplicablePartyText:   string;
    BaggageAllowanceID:    string;
    TypeCode:              string;
    Weight:                Weight[];
}

export interface BaggageAllowanceRefID {
    BaggageAllowanceRefID: string[];
}


export interface Weight {
    Max:  string;
    Unit: string;
}


export interface ItineraryClear {
    PaxJourneyID: string;
}

export interface ItineraryList {
    Arrival:               string;
    Departure:             string;
    CarrierDesigCode:      string;
    CarrierFlightNumber:   string;
    OperationalSuffixText: string;
}

export interface PaxList {
    PaxID: string;
    PTC:   string;
}
