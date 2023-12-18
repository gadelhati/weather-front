import { Structure } from "../structure/structure.interface";

export interface Radar {
    readonly id: string,
    morse: string,
    structure?: Structure,
}