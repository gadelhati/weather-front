import { Radar } from "../radar/radar.interface";

export interface Structure {
    readonly id: string,
    altitude: number,
    height: number,
    calado: number,
    circuloDeGiro: number,
    color: string,
    buildingMaterial: string,
    name: string,
    number: string,
    placaDeVisibilidade: boolean,
    refletorRadar: boolean,
    visivelmenteConspicuo: boolean,
    format: string,
    radar?: Radar,
}