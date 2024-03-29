import { Country } from "../country/country.interface";
import { Equipment } from "../equipment/equipment.interface";
import { Institution } from "../institution/institution.interface";
import { StationCategory } from "../station.category/station.category.interface";
import { Surveying } from "../surveying/surveying.interface";

export interface StationHistoricOnShore {
    readonly id: string,
    localDepth: number,
    activation: Date,
    latitude: number,
    longitude: number,
    marsdenSquare: number,
    marsdenSubSquare_1: number,
    wmoSquare: number,
    marsdenSubSquare_5: number,

    stationCategory?: StationCategory,
    equipment?: Equipment,
    surveying?: Surveying,
    institution?: Institution,
    country?: Country,

    number: number,
    name: string,
    altitude: number,
    status: boolean,
    deactivation: Date,
}