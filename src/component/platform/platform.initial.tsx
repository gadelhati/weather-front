import { initialCountry } from "../country/country.initial";
import { initialPlatformCategory } from "../platform.category/platformCategory.initial";
import { Platform } from "./platform.interface";

export const initialPlatform : Platform = {
    id: '',
    visualCallsign: '',
    telegraphicCallsign: '',
    internationalCallsign: '',
    name: '',
    internationalName: '',
    country: undefined,
    platformCategory: undefined,
}