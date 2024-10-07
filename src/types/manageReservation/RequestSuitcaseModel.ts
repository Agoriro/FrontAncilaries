import {Canalventa} from "@/types/homeSearch/ClientDataModel"
export interface RequestSuitcase {
    RQ_MALETAS: RqMaletas;
}

export interface RqMaletas {
    RESERVA:    string;
    PASAJEROS:  Pasajero[];
    CANALVENTA: Canalventa;
    TRACKID:    string;
}
export interface Pasajero {
    PAXID?: any;
    PTC?:   any;
    NOMBRE?:          string;
    ID?:              string;
    DOCUMENTO?:       string;
    TIPODOCUMENTO?:   string;
    CORREO?:          string;
    TELEFONO?:        string;
    FECHANACIMIENTO?: Date;
    GENERO?:          string;
    NACIONALIDAD?:    string;
    DIRECCION?:       string;
}