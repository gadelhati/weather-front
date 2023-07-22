import { api } from "../assets/api/api"
import { ErrorMessage } from "../assets/error/errorMessage"
import { User } from "../component/user/user.interface"
import { setToken } from "./service.token"

// Respostas de informação (100-199),
// Respostas de sucesso (200-299),
// Redirecionamentos (300-399)
// Erros do cliente (400-499)
// Erros do servidor (500-599).

const addError = (error: any):ErrorMessage[] => {
    let errorMessage: ErrorMessage[] = []
    if (error.response.data.errors.length){
        error.response.data?.errors?.forEach((element: ErrorMessage) => {
            errorMessage.push({ field: element.field, message: element.message })
        })
    } else {
        errorMessage.push({ field: 'DTO', message: 'outro erro' })
    }
    if (error.response.status != '401'){
        errorMessage.push({ field: 'DTO', message: 'Unauthorized' })
    }
    return errorMessage
}

export const login = async<Auth,>(url: string, object: Auth) => {
    return await api.post(url, object)
        .then(response => {
            setToken(response.data)
            return response.data
        })
        .catch(error => { return addError(error) })
}

export const changePassword = async (data: User) => {
    return await api.put<User>(`/userEntity/changePassword`, data)
        .then(response => {
            return response.data
        })
        .catch(error => { 
            console.log(error)
            return addError(error) })
}

export const create = async<T,>(url: string, object: T) => {
    return await api.post(`/${url}`, object)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

export const createAll = async<T,>(url: string, object: T[]) => {
    return await api.post(`/${url}/createAll`, object)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

export const retrieve = async<T,>(url: string, page: number, size: number, key: string, value: string) => {
    return await api.get(`/${url}?key=${key}&value=${value}`, { params: { page: page, size: size } } )
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

export const update = async<T,>(url: string, object: T) => {
    return await api.put(`/${url}`, object)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

export const remove = async<T,>(url: string, id: string) => {
    return await api.delete(`/${url}/${id}`)
        .then(response => { return response.data })
        .catch(error => { return addError(error) })
}

export const removeWeather = async<T,>(url: string, dateObservation: string, ii: string, iii: string, ddddddd: string) => {
    if(ii !== null || iii !== null){
        return await api.delete(`/${url}/${dateObservation}/${ii}/${iii}`)
            .then(response => { return response.data })
            .catch(error => { return addError(error) })
    } else {
        return await api.delete(`/${url}/${dateObservation}/${ddddddd}`)
            .then(response => { return response.data })
            .catch(error => { return addError(error) })
    }
}

export const removeAll = async<T,>(url: string) => {
    return await api.delete(`/${url}`)
        .then(response => { return response.data })
        .catch(error => { return addError(error) });
}