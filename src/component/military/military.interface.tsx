import { Vacation } from "../vacation/vacation.interface";

export interface Military {
    order: number,
    active: boolean,
    graduate: string,
    nip: string,
    name: string,
    vacation: Vacation[],
}