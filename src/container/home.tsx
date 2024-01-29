import { useState, useEffect, useTransition } from 'react'
import { Icon } from '../assets/svg.access';
import { getPayload } from '../service/service.token'
import { Card, CardContainer } from './template/card'
import { Header, TitleHeader } from './template/header'
import { vector } from './menu';
import { UriScreenFormat } from '../service/uri.format'
import { accessList } from './access.list'
import { Button } from './template/button'

export const Home = () => {
    // const [ispending, startTransition] = useTransition()
    const [list, setList] = useState<boolean[]>(accessList())

    // useEffect(()=> {
    //     startTransition(() => setList(accessList()))
    // },[])
    return (
        <>
            <Header>
                <TitleHeader><h1>Início</h1></TitleHeader>
                <a href={`#/${'profile'}`}><Button category={'secondary'}>{getPayload().sub}</Button></a>
            </Header>
            <CardContainer>
                {vector.map((element, index) => {
                    return <Card key={Math.random()}><a key={Math.random()} href={`#/${vector[index][0]}`}><Icon name={vector[index][1]} /><p>{UriScreenFormat(vector[index][0])}</p></a></Card>
                })}
            </CardContainer>
        </>
    );
}