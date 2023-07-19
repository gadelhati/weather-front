import { useState, ChangeEvent, useTransition } from 'react';
import { styled } from '@stitches/react';
import { Button } from '../template/button';
import { Weather } from '../../component/weather/weather.interface';
import { initialWeather } from '../../component/weather/weather.initial';
import { createAll, retrieve } from '../../service/service.crud';
import { initialErrorMessage } from '../../assets/error/errorMessage.initial';
import { ErrorMessage } from '../../assets/error/errorMessage';

export const FindFile = styled('input', {
    padding: '.45rem',
    borderRadius: '.3rem',
    color: '#fff',
    backgroundColor: '#6c757d',
    cursor: 'pointer',
    userSelect: 'none',
});

export const WeatherUpload = () => {
    const [state, setState] = useState<Weather[]>([initialWeather])
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [ispending, startTransition] = useTransition()

    const createAllItems = () => {
        createAll<Weather>('weather', state)
        retrieveItem()
        // refresh()
    }
    const retrieveItem = async () => {
        await retrieve("weather", 0, 20, '', '').then((data) => {
            startTransition(() => setState(data.content))
        })
    }
    const refresh = () => {
        window.location.reload()
    }
    const executed = (): boolean => {
        let executed: boolean = false
        error?.map((element: any) => { if("" == element.field) return executed = true })
        return executed
    }
    const handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
        const weathers : Weather[] = []
        const fileReader = new FileReader()
        fileReader.readAsText(event.target.files?.[0] as File)
        fileReader.onload = (event) => {
            const fileAsText = event.target?.result
            if (typeof fileAsText === 'string') {
                let itens: Weather[] = JSON.parse(fileAsText.toString());
                itens.forEach((item, index) => {
                    weathers[index] = item
                })
            } else {
                console.log("This file cannot be used!")
            }
        };
        setState(weathers)
    }
    return (
        <div>
            <FindFile type="file" onChange={handleInputFile} ></FindFile>
            <Button disabled={ispending ? true : false} color="success" onClick={createAllItems} >Upload</Button>
            <Button disabled={true} hidden={ispending ? false : true}>Carregando</Button>
            {/* <Button disabled={true} hidden={executed()? false : true}>Executado</Button> */}
        </div>
    );
}