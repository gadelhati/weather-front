import { useState, ChangeEvent } from 'react'
import list from './militaries.json'
import { Military } from '../../component/military/military.interface'
import { Supervisor } from './supervisor'
import { initialMilitary } from '../../component/military/military.initial'
import { Service } from '../../component/service/service.interface'
import { initialService } from '../../component/service/service.initial'

export const MilitariesList = () => {
    const [military, setMilitary] = useState<Military>(initialMilitary)
    const [militaries, setMilitaries] = useState<Military[]>(list)
    const [service, setService] = useState<Service[]>([initialService])
    const [day, setDay] = useState<Date>(new Date())
    const color = ['one', 'two', 'three', 'four', 'five', 'six']

    const week = (entrance: number, range: number) => {
        let services: Military[] = []
        let d: Date = day
        while(range>0){
            if(entrance < militaries.length) {
                if(militaries[entrance]?.vacation[0]?.begin !== undefined && militaries[entrance]?.vacation[0]?.finish !== undefined
                    // &&
                    // new Date(d.setDate(d.getDate() + 1)).getTime() >= new Date(militaries[entrance]?.vacation[0]?.begin).getTime() &&
                    // new Date(d.setDate(d.getDate() + 1)).getTime() <= new Date(militaries[entrance]?.vacation[0]?.finish).getTime()
                    ){
                    entrance++
                } else {
                    services.push(militaries[entrance])
                    entrance++
                    range--
                }
            } else if (entrance === militaries.length) {
                entrance = 0
            }
        }
        return services
    }
    const schedule = () => {
        let value: Military = military
        let d: Date = day
        let services: Service[] = []
        if(value !== undefined) {
            setMilitary(value)
            for(const military1 of week(militaries.indexOf(value), 7)) {
                if(military1?.vacation[0]?.begin !== undefined && military1?.vacation[0]?.finish !== undefined &&
                    new Date(d.setDate(d.getDate() + 1)).getTime() >= new Date(military1?.vacation[0]?.begin).getTime() &&
                    new Date(d.setDate(d.getDate() + 1)).getTime() <= new Date(military1?.vacation[0]?.finish).getTime()){
                        console.log(military1.name, "não")
                        continue
                    }else {
                        console.log(military1.name, "sim")
                        services.push({date: new Date(d.setDate(d.getDate() + 1)), military: military1})
                    }
            }
            setService(services)
        }
        setDay(new Date())
    }
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        let value = militaries.find((military)=>military.nip === event.target.value)
        if(value !== undefined) { setMilitary(value) }
    }
    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDay(new Date(event.target.value))
    }
    return(
        <>
            <select id={'select'} name={'select'} onChange={handleSelectChange}>
                {militaries.map((military: Military)=>{
                    return <option value={military.nip} >{military.name}</option>
                })}
            </select>
            <div>{military.name}</div>
            <input type='date' onChange={handleDateChange}></input>
            <div>{day.getDate()}</div>
            <button onClick={schedule}>schedule</button>
            <div>
                {service.map((servi: Service, index: number)=>{
                    return <Supervisor >{servi.date.getDate()}{servi.military.name}</Supervisor>
                })}
            </div>
        </>
    )
}