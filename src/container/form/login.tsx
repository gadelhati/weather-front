import { useState, ChangeEvent, useTransition, useEffect } from 'react'
import { User } from "../../component/user/user.interface"
import { initialUser } from '../../component/user/user.initial'
import { ErrorMessage } from '../../assets/error/errorMessage'
import { initialErrorMessage } from '../../assets/error/errorMessage.initial'
import { login, retrieve } from '../../service/service.crud'
import { Tooltip } from '../tooltip/tooltip'
import { ContainerInput } from './generic.field'
import { Button } from '../template/button';
import { logout } from '../../service/service.crud'
import { existsToken, getPayload, isValidToken } from '../../service/service.token'
import logo from '../../assets/image/marinha.png'
import { Rotate } from '../template/rotate'
import { Toast } from '../toast/toast'
import { Home } from '../home'
import { CenterContainer, CenterItem } from '../template/flex'

export const Login = () => {
    const [state, setState] = useState<User>(initialUser)
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [ispending, startTransition] = useTransition()

    useEffect(() => {
        retrieveItem()
    }, [])
    const retrieveItem = async () => {
        await retrieve('userEntity', 0, 20, 'username', getPayload().sub).then((data: any) => {
            startTransition(() => setState(data?.content[0]))
        }).catch((error) => { setError(error) })
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
    const loginUser = async () => {
        await login('auth/login', state).then((data) => {
            startTransition(() => validItem(data))
        }).catch((error) => { setError(error) })
    }
    const logoutUser = async () => {
        logout()
        resetItem()
    }
    const validation = (name: string): string[] => {
        let vector: string[] = []
        if (Array.isArray(error)) {
            if (name === '') {
                error?.map((element: any) => { if (element.field?.startsWith("DTO")) return vector.push(element?.message + '. ') })
            } else {
                error?.map((element: any) => { if (name == element.field) return vector.push(element?.message + '. ') })
            }
        }
        return vector
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setState({ ...state, [event.target.name]: value })
    }
    return (
        <>
            {isValidToken() ?
                <Home></Home>
                :
                <CenterContainer>
                    <CenterItem>
                        <Rotate src={logo} alt="" width="120" height="128"></Rotate>
                        <Tooltip data-tip={validation('username')} hidden={validation('username').length === 0} >
                            <ContainerInput>
                                <input type={'text'} required autoFocus name={'username'} value={state.username} onChange={handleInputChange} autoComplete='off' />
                                <label htmlFor="username">Username</label>
                            </ContainerInput>
                        </Tooltip>
                        <Tooltip data-tip={validation('password')} hidden={validation('password').length === 0} >
                            <ContainerInput>
                                <input type={'password'} required name={'password'} value={state.password} onChange={handleInputChange} autoComplete='off' />
                                <label htmlFor="password">Password</label>
                            </ContainerInput>
                        </Tooltip>
                        {!isValidToken() && <Button category={'primary'} onClick={loginUser}>Login</Button>}
                        {isValidToken() && <Button onClick={logoutUser}>Logout</Button>}
                        {ispending}
                        <span>
                            {Array.isArray(error) && error.map((erro: ErrorMessage, index: number) => {
                                return <p key={Math.random()}>{erro.message === "Unauthorized" && "Não Autorizado"}</p>
                            })}
                        </span>
                    </CenterItem>
                    <Toast className="notifications"></Toast>
                </CenterContainer>
            }
        </>
    );
}