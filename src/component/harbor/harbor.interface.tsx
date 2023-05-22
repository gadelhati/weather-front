import { Institution } from "../institution/institution.interface";
import { Station } from "../station/station.interface";

export interface Harbor {
    id: string,
    name: string,
    institution?: Institution,
    station?: Station,
}