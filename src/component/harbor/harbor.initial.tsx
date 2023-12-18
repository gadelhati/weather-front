import { initialInstitution } from "../institution/institution.initial";
import { initialStation } from "../station/station.initial";
import { Harbor } from "./harbor.interface";

export const initialHarbor : Harbor = {
    id: '',
    name: '',
    institution: undefined,
    station: undefined,
}