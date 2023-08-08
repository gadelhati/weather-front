import { useState, ChangeEvent, useTransition, useEffect } from 'react'
import { User } from "../../component/user/user.interface"
import { initialUser } from '../../component/user/user.initial'
import { ErrorMessage } from '../../assets/error/errorMessage'
import { initialErrorMessage } from '../../assets/error/errorMessage.initial'
import { changePassword, retrieve } from '../../service/service.crud'
import { ContainerInput } from './generic.field'
import { Button } from '../template/button';
import { logout } from '../../service/service.token'
import { getPayload, getRoles } from '../../service/service.token'
import { Header, TitleHeader } from '../template/header'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
    const [state, setState] = useState<User>(initialUser)
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [ispending, startTransition] = useTransition()
    const navigate = useNavigate();

    useEffect(() => {
        {ispending}
        retrieveItem()
    },[])
    const retrieveItem = async () => {
        await retrieve('userEntity', 0, 20, 'username', getPayload().sub).then((data: any) => {
            startTransition(() => setState(data?.content[0]))
        }).catch(() => { networkError() })
    }
    const refresh = () => {
        window.location.reload()
    }
    const resetItem = () => {
        setState(initialUser)
        setError([initialErrorMessage])
    }
    const validItem = (data: any) => {
        if (data?.accessToken) {
            setState(data)
            setError([initialErrorMessage])
            refresh()
        } else {
            startTransition(() => setError(data))
        }
    }
    const networkError = () => {
        setError([{ field: 'DTO', message: 'Network Error' }])
    }
    const logoutUser = async () => {
        navigate('/login')
        logout()
        resetItem()
    }
    const validation = (name: string): string[] => {
        let vector: string[] = []
        error?.map((element: any) => { if (name == element.field) return vector.push(element?.message) })
        return vector
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setState({ ...state, [event.target.name]: value })
    }
    const changePasswordItem = async () => {
        await changePassword(state).then((data) => {
            startTransition(() => validItem(data))
        }).catch(() => { networkError() })
    }
    return (
        <>
            <Header>
                <TitleHeader><h1>Profile</h1></TitleHeader>
                <TitleHeader><h1>{getPayload().sub}</h1></TitleHeader>
                <p>{getRoles()}</p>
                <Button onClick={logoutUser}>Logout</Button>
            </Header>
            <Header>
                <div style={{ display: 'flex' }}>
                    <ContainerInput error={validation("password").length !== 0 ? true : false} >
                        <span>
                            <input type={'password'} required name={'password'} value={state.password} onChange={handleInputChange} autoComplete='off' />
                            <label htmlFor={"password"}>New Password</label>
                            <label htmlFor={"password"}>{validation("password")}</label>
                        </span>
                    </ContainerInput>
                </div>
                <Button onClick={changePasswordItem}>Change</Button>
            </Header >
        </>
    );
}