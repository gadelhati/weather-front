import { getPayload, getRoles } from '../../service/service.token'
import { Header, TitleHeader } from '../template/header'

export const Home = () => {

    return (
        <>
            <Header>
                <TitleHeader>Home<h1>{getPayload().sub}</h1></TitleHeader>
                <p>{getRoles()}</p>
            </Header>
        </>
    );
}