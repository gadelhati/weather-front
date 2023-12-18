import { initialCommission } from "../commission/commission.initial";
import { initialCountry } from "../country/country.initial";
import { initialEquipment } from "../equipment/equipment.initial";
import { initialInstitution } from "../institution/institution.initial";
import { initialPlatformCategory } from "../platform.category/platformCategory.initial";
import { initialStationCategory } from "../station.category/station.category.initial";
import { initialSurveying } from "../surveying/surveying.initial";
import { StationHistoric } from "./station.historic.interface";

export const initialStationHistoric: StationHistoric = {
    id: '',
    localDepth: 0,
    activation: new Date(),
    latitude: 0,
    longitude: 0,
    marsdenSquare: 0,
    marsdenSubSquare_1: 0,
    wmoSquare: 0,
    marsdenSubSquare_5: 0,
    platformCode: '',
    collectionDepth: '',
    commissionCode: '',
    
    stationCategory: undefined,
    equipment: undefined,
    surveying: undefined,
    institution: undefined,
    country: undefined,
    commission: undefined,
    platformCategory: undefined,
}