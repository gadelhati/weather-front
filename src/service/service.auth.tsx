import { api } from "../assets/api/api"
import { setToken, removeToken } from "./service.token"
import { Auth } from "../component/auth/auth.interface"
import { User } from "../component/user/user.interface"

export const signin = async (data: Auth) => {
  const response = await api.post<Auth>(`/auth/login`, data)
  if (response.data.accessToken) {
    setToken(response.data)
  }
  return response
}

export const changePassword = (id: string, data: User) => {
  return api.put<User>(`/user/changePassword/${id}`, data)
}

export const logout = () => {
  removeToken()
}

export const refreshToken = () => {
  refreshToken()
}