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