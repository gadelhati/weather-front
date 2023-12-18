import { initialMilitary } from '../military/military.initial'
import { Service } from './service.interface'

export const initialService : Service = {
    date: new Date(),
    military: initialMilitary,
}