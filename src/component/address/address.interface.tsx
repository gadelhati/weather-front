import { Country } from "../country/country.interface";

export interface Address {
    readonly id: string,
    street: string,
    number: string,
    country?: Country,
}