import { Country } from './../country/country.interface'

export interface Institution {
    id: string,
    name: string,
    country?: Country,
}