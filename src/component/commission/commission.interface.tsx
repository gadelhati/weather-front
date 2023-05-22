import { Institution } from "../institution/institution.interface"
import { Surveying } from "../surveying/surveying.interface"
import { Platform } from "../platform/platform.interface"
import { Harbor } from "../harbor/harbor.interface";

export interface Commission {
    id: string,
    name: string,
    departure: Date,
    arrival: Date,
    latitudeMostBottom: number,
    latitudeMostTop: number,
    longitudeMostRight: number,
    longitudeMostLeft: number,
    origin?: Harbor,
    destination?: Harbor,
    responsible?: Institution,
    coordinator?: Institution,
    surveying?: Surveying;
    platform?: Platform,
}