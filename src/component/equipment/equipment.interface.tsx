import { Manufacturer } from "../manufacturer/manufacturer.interface";

export interface Equipment {
    id: string,
    name: string,
    manufacturer?: Manufacturer,
}