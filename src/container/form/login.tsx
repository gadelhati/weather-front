import { useState, ChangeEvent, useTransition, useEffect } from 'react'
import { User } from "../../component/user/user.interface"
import { initialUser } from '../../component/user/user.initial'
import { ErrorMessage } from '../../assets/error/errorMessage'
import { initialErrorMessage } from '../../assets/error/errorMessage.initial'
import { login, retrieve } from '../../service/service.crud'
import { Tooltip } from '../tooltip/tooltip'
import { FloatLabel } from './generic.field'
import { CenteredContainer, CenteredContainerItem } from '../template/flex'
import { Button } from '../template/button';
import { logout } from '../../service/service.token'
import { existsToken, getPayload, isValidToken } from '../../service/service.token'
import logo from '../../assets/image/marinha.png'
import { Rotate } from '../template/rotate'
import { Toast } from '../toast/toast'
import { Home } from './home'

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
    const loginUser = async () => {
        await login('auth/login', state).then((data) => {
            startTransition(() => validItem(data))
        }).catch(() => { networkError() })
    }
    const logoutUser = async () => {
        logout()
        resetItem()
    }
    const validation = (name: string): string[] => {
        let vector: string[] = []
        error?.map((element: any) => { if (name == element.field) return vector.push(element?.message) })
        return vector
    }
    const validationConnection = (): string[] => {
        let vector: string[] = []
        error?.map((element: any) => { if (element.field?.startsWith("DTO")) return vector.push(element?.message) })
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
                <CenteredContainer>
                    <CenteredContainerItem>
                        <Rotate src={logo} alt="" width="120" height="128"></Rotate>
                        <Tooltip data-tip={validation('username')} hidden={validation('username').length === 0} >
                            <FloatLabel>
                                <input type={'text'} required name={'username'} value={state.username} onChange={handleInputChange} autoComplete='off' />
                                <label htmlFor="name">Name</label>
                            </FloatLabel>
                        </Tooltip>
                        <Tooltip data-tip={validation('password')} hidden={validation('password').length === 0} >
                            <FloatLabel>
                                <input type={'password'} required name={'password'} value={state.password} onChange={handleInputChange} autoComplete='off' />
                                <label htmlFor="password">Password</label>
                            </FloatLabel>
                        </Tooltip>
                        <CenteredContainerItem direction={'row'}>
                            {!isValidToken() && <Button onClick={loginUser}>Login</Button>}
                            {isValidToken() && <Button onClick={logoutUser}>Logout</Button>}
                            <Button onClick={resetItem}>Reset{existsToken()}</Button>
                        </CenteredContainerItem>
                        <CenteredContainerItem direction={'row'}>
                            {error[0].message !== 'Network Error' ? <>© Marinha do Brasil</> : <>{validationConnection()}</>}
                        </CenteredContainerItem>
                    </CenteredContainerItem>
                    <Toast className="notifications"></Toast>
                </CenteredContainer>
            }
        </>
    );
}