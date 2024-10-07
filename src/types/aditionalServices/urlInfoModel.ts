import { PaxList, OriginDestList, RqMaletas, PaxSegmentList, ContactInfoList } from '@/types';


export interface UrlInfo {
    RQ_MALETAS: RqMaletas;
    PaxList: PaxList;
    TypeBagage: number;
    ItineraryInfo: PaxSegmentList;
    OriginDestList: OriginDestList;
    ContactListPassengers: ContactInfoList;
    TotalAmount:    number;
}
