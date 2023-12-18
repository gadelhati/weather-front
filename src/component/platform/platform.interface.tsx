import { Country } from "../country/country.interface";
import { PlatformCategory } from "../platform.category/platformCategory.interface";

export interface Platform {
    readonly id: string,
    visualCallsign: string,
    telegraphicCallsign: string,
    internationalCallsign: string,
    name: string,
    internationalName: string,
    country?: Country,
    platformCategory?: PlatformCategory,
}