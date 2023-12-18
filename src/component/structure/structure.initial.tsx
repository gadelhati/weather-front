import { initialRadar } from "../radar/radar.initial"
import { Structure } from "./structure.interface"

export const initialStructure : Structure = {
    id: '',
    altitude: 0,
    height: 0,
    calado: 0,
    circuloDeGiro: 0,
    color: '',
    buildingMaterial: '',
    name: '',
    number: '',
    placaDeVisibilidade: true,
    refletorRadar: true,
    visivelmenteConspicuo: true,
    format: '',
    radar: undefined,
}