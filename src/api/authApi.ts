import axios from 'axios'
import { Role } from '../types/role'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

class AuthApi {
  private static instance: AuthApi

  private constructor() {}

  public static getInstance(): AuthApi {
    if (!AuthApi.instance) {
      AuthApi.instance = new AuthApi()
    }
    return AuthApi.instance
  }

  public async login(email: string, password: string): Promise<string> {
    return axios
      .post<{ token: string; role: string }>(`${API_BASE_URL}/auth/login`, { email, password })
      .then((response) => {
        const { token, role } = response.data
        if (!token || !role) throw new Error('No se recibió token o rol')

        sessionStorage.setItem('token', token)
        sessionStorage.setItem('role', role)
        sessionStorage.setItem('user', JSON.stringify({ email, role }))

        return token
      })
      .catch((error) => {
        console.error('❌ Error en el login:', error)
        throw error
      })
  }

  public async register(
    name: string,
    email: string,
    password: string,
    role: Role = Role.USER
  ): Promise<void> {
    return axios
      .post(`${API_BASE_URL}/auth/register`, { name, email, password, role })
      .then(() => console.log('Usuario registrado correctamente'))
      .catch((error) => {
        console.error('Error en el registro:', error)
        throw error
      })
  }

  public getToken(): string | null {
    return sessionStorage.getItem('token')
  }

  public setToken(token: string): void {
    sessionStorage.setItem('token', token)
  }

  public logout(): void {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
  }

  public getUser(): { email: string; role: string } | null {
    try {
      const user = sessionStorage.getItem('user')
      if (!user) return null

      const parsedUser = JSON.parse(user)

      if (!parsedUser.email || !parsedUser.role) {
        console.error('❌ `user` en sessionStorage está corrupto:', parsedUser)
        sessionStorage.removeItem('user')
        return null
      }

      return parsedUser
    } catch (error) {
      console.error('❌ Error al parsear user desde sessionStorage:', error)
      sessionStorage.removeItem('user')
      return null
    }
  }

  public isAuthenticated(): boolean {
    return !!this.getToken()
  }

  public getAuthHeaders(): Record<string, string> {
    const token = this.getToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }
}

export const authApi = AuthApi.getInstance()
