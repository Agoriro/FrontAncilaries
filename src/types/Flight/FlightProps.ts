import {IATA} from '../IATA/IATA'
import { OriginDestList } from './OriginDestList';
import { SeatsAvailability } from './SeatsAvailability';
import { Passenger } from '../passengers/Passenger';

export interface FlightProps {
    originDestList: OriginDestList[];
    seatsAvailability: SeatsAvailability[];
    passengers: Passenger[];
  }