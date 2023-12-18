import { Country } from './../country/country.interface'

export interface Institution {
    readonly id: string,
    name: string,
    country?: Country,
}