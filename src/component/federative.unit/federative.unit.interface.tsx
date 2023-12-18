import { Country } from "../country/country.interface";

export interface FederativeUnit {
    readonly id: string,
    name: string,
    initials: string,
    country: Country,
}