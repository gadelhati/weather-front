import { Manufacturer } from "../manufacturer/manufacturer.interface";

export interface Equipment {
    readonly id: string,
    name: string,
    manufacturer?: Manufacturer,
}