import { initialHarbor } from "../harbor/harbor.initial";
import { initialInstitution } from "../institution/institution.initial";
import { initialPlatform } from "../platform/platform.initial";
import { initialSurveying } from "../surveying/surveying.initial";
import { Commission } from "./commission.interface";

export const initialCommission : Commission = {
    id: '',
    name: '',
    departure: new Date(),
    arrival: new Date(),
    latitudeMostBottom: 0,
    latitudeMostTop: 0,
    longitudeMostRight: 0,
    longitudeMostLeft: 0,
    origin: initialHarbor,
    destination: initialHarbor,
    institution: initialInstitution,
    coordinator: initialInstitution,
    surveying: initialSurveying,
    platform: initialPlatform,
}