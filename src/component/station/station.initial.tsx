import { Station } from "./station.interface";

export const initialStation: Station = {
    id: '',
    localDepth: 0,
    activation: new Date(),
    latitude: 0,
    longitude: 0,
    marsdenSquare: 0,
    marsdenSubSquare_1: 0,
    wmoSquare: 0,
    marsdenSubSquare_5: 0,
    
    stationCategory: undefined,
    equipment: undefined,
    surveying: undefined,
    institution: undefined,
    country: undefined,
}