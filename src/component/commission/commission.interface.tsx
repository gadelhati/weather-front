import { Institution } from "../institution/institution.interface"
import { Surveying } from "../surveying/surveying.interface"
import { Platform } from "../platform/platform.interface"
import { Harbor } from "../harbor/harbor.interface";

export interface Commission {
    readonly id: string,
    name: string,
    departure: Date,
    arrival: Date,
    latitudeMostBottom: number,
    latitudeMostTop: number,
    longitudeMostRight: number,
    longitudeMostLeft: number,
    origin?: Harbor,
    destination?: Harbor,
    institution?: Institution,
    coordinator?: Institution,
    surveying?: Surveying;
    platform?: Platform,
}