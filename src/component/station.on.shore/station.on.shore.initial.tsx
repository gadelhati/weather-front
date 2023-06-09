import { initialCountry } from "../country/country.initial";
import { initialEquipment } from "../equipment/equipment.initial";
import { initialInstitution } from "../institution/institution.initial";
import { initialStationCategory } from "../station.category/station.category.initial";
import { initialSurveying } from "../surveying/surveying.initial";
import { StationOnShore } from "./station.on.shore.interface";

export const initialStationOnShore: StationOnShore = {
    id: '',
    localDepth: 0,
    activation: new Date(),
    latitude: 0,
    longitude: 0,
    marsdenSquare: 0,
    marsdenSubSquare_1: 0,
    wmoSquare: 0,
    marsdenSubSquare_5: 0,
    
    station_category: initialStationCategory,
    equipment: initialEquipment,
    surveying: initialSurveying,
    institution: initialInstitution,
    country: initialCountry,

    number: 0,
    name: '',
    altitude: 0,
    status: true,
    deactivation: new Date(),
}