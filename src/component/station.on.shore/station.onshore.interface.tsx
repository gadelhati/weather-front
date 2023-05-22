import { Station } from "../station/station.interface";
// import { Station } from "./";
// import { Platform } from "../../platform/platform.interface";
// import { StationCategory } from "../../stationCategory/station.category.interface";
// import { Equipment } from "../../equipment/equipment.interface";
// import { Surveying } from "../../surveying/surveying.interface";
// import { Institution } from "../../institution/institution.interface";
// import { Country } from "../../country/country.interface";

export interface StationOnShore extends Station {
    // id: string,
    // localDepth: number,
    // activation: Date,
    // latitude: number,
    // longitude: number,
    // marsdenSquare: number,
    // marsdenSubSquare_1: number,
    // wmoSquare: number,
    // marsdenSubSquare_5: number,

    // stationCategory?: StationCategory,
    // equipment?: Equipment,
    // surveying?: Surveying,
    // responsible?: Institution,
    // country?: Country,

    number: number,
    name: string,
    altitude: number,
    status: boolean,
    deactivation: Date,
}