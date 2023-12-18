import { intialVacation } from '../vacation/vacation.initial'
import { Military } from './military.interface'

export const initialMilitary : Military = {
    order: 0,
    active: false,
    graduate: '',
    nip: '',
    name: '',
    vacation: [intialVacation],
}