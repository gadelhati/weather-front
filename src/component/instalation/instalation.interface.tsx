import { Maintainer } from "../maintainer/maintainer.interface";

export interface Instalation {
    readonly id: string,
    name: string,
    maintainer?: Maintainer,
}