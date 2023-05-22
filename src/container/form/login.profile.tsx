import { useState, ChangeEvent, useTransition } from 'react'
import { User } from "../../component/user/user.interface"
import { initialUser } from '../../component/user/user.initial'
import { ErrorMessage } from '../../assets/error/errorMessage'
import { initialErrorMessage } from '../../assets/error/errorMessage.initial'
import { login } from '../../service/service.crud'
import { Tooltip } from '../tooltip/tooltip'
import { ContainerInput } from './generic.field'
import { CenterContainer, CenterItem } from '../template/flex'
import { Button } from '../template/button';
import { logout } from '../../service/service.auth'
import { existsToken, getPayload, getRoles, isValidToken } from '../../service/service.token'
import logo from '../../assets/image/marinha.png'
import { Rotate } from '../template/rotate'
import { Toast } from '../toast/toast'

export const LoginProfile = () => {
    const [state, setState] = useState<User>(initialUser)
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [ispending, startTransition] = useTransition()

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
        await login('auth', state).then((data) => {
            validItem(data)
        }).catch((error) => { networkError() })
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
        <CenterContainer>
            {isValidToken() ?
                <>
                    {getPayload().sub}{getRoles()}
                    {isValidToken() && <Button onClick={logoutUser}>Logout</Button>}
                </>
                :
                <CenterItem>
                    <Rotate src={logo} alt="" width="120" height="128"></Rotate>
                    <Tooltip data-tip={validation('username')} hidden={validation('username').length === 0} >
                        <ContainerInput>
                            <input type={'text'} required name={'username'} value={state.username} onChange={handleInputChange} autoComplete='off' />
                            <label htmlFor="name">Name</label>
                        </ContainerInput>
                    </Tooltip>
                    <Tooltip data-tip={validation('password')} hidden={validation('password').length === 0} >
                        <ContainerInput>
                            <input type={'password'} required name={'password'} value={state.password} onChange={handleInputChange} autoComplete='off' />
                            <label htmlFor="password">Password</label>
                        </ContainerInput>
                    </Tooltip>
                    <CenterItem direction={'row'}>
                        {!isValidToken() && <Button onClick={loginUser}>Login</Button>}
                        {isValidToken() && <Button onClick={logoutUser}>Logout</Button>}
                        <Button onClick={resetItem}>Reset{existsToken()}</Button>
                    </CenterItem>
                    {/* {loading && <>Loading...</>}
                {error != null && JSON.stringify(error)} */}
                    <div>{validationConnection()}</div>
                </CenterItem>
            }
            <Toast className="notifications"></Toast>
        </CenterContainer>
    );
}