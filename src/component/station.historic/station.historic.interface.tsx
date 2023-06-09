import { Commission } from "../commission/commission.interface";
import { Country } from "../country/country.interface";
import { Equipment } from "../equipment/equipment.interface";
import { Institution } from "../institution/institution.interface";
import { PlatformCategory } from "../platform.category/platformCategory.interface";
import { StationCategory } from "../station.category/station.category.interface";
import { Surveying } from "../surveying/surveying.interface";

export interface StationHistoric {
    id: string,
    localDepth: number,
    activation: Date,
    latitude: number,
    longitude: number,
    marsdenSquare: number,
    marsdenSubSquare_1: number,
    wmoSquare: number,
    marsdenSubSquare_5: number,
    platformCode: string,
    collectionDepth: string,
    commissionCode: string,

    station_category?: StationCategory,
    equipment?: Equipment,
    surveying?: Surveying,
    institution?: Institution,
    country?: Country,
    commission?: Commission,
    platform_category?: PlatformCategory,
}