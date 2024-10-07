export interface ClientData {
    RQDATA: Rqdata;
}

export interface Rqdata {
    RESERVA:    Reserva;
    CANALVENTA: Canalventa;
}

export interface Canalventa {
    CANAL:      string;
    IDVENDEDOR: string;
    IDOFICINA: string;
    URLRETORNO: string;
    NOMBREOFICINA: string;
}

export interface Reserva {
    PNR:       string;
    PAX:       string;
    AEROLINEA: string;
    PROVEDOR: string;
    DOCUMENTO: string;
    IDPROVEDOR: string;
}