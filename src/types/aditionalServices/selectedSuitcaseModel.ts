import {Canalventa, Pasajero} from "@/types/"

export interface SelectedSuitcases {
    RQ_PRODUCTO: RqProducto;

}

export interface RqProducto {
    RESERVA:       string;
    TRACKID:       string;
    CANAL:         string;
    IDVENDEDOR:    string;
    IDOFICINA:     string;
    NOMBREOFICINA: string;
    IDPROVEDOR:    string;
    PROVEDOR:      string;
    IDAEROLINEA:   string;
    AEROLINEA:     string;
    CLIENTE:       Cliente;
    PASAJEROS:     Pasajero[];
    ITINERARIO:    Itinerario[];
    IMPUESTOS:     Impuesto[];
    OFERTA:        Oferta;
    CANALVENTA:    Canalventa;
    VALORES:       Valores;
}
export interface Cliente {
    DOCUMENTO: string;
    NOMBRE:    string;
}

export interface Impuesto {
    BASE_AMOUNT:      number;
    PERCENTAGE_VALUE: number;
    AMOUNT_VALUE:     number;
    CODIGO:           string;
    NOMBRE:           string;
    VALOR:            string;
}

export interface Itinerario {
    ORIGEN:       string;
    FECHAORIGEN:  Date;
    NUMEROVUELO:  string;
    AEROLINEA:    string;
    DESTINO:      string;
    FECHADESTINO: Date;
    CLASE:        string;
}

export interface Oferta {
    MALETAS:   Asiento[];
    ASIENTOS:  Asiento[];
    REVISADOS: Asiento[];
}

export interface Asiento {
    OfferRefID:     string;
    OfferItemRefID: string;
    PaxRefID:       string;
}


export interface Valores {
    BASE:  string;
    TOTAL: string;
}