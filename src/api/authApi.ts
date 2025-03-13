import axios from 'axios'
import { AppUser } from '../types/appUser'
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
      .post<{ token: string }>(`${API_BASE_URL}/auth/login`, { email, password })
      .then((response) => {
        const token = response.data.token
        if (!token) throw new Error('No se recibió un token')
        this.setToken(token)
        return token
      })
      .catch((error) => {
        console.error('Error en el login:', error)
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

  public logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user') // Eliminamos también los datos del usuario
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token)
  }

  public getToken(): string | null {
    return localStorage.getItem('token')
  }

  public getUser(): AppUser | null {
    const user = localStorage.getItem('user')
    return user ? (JSON.parse(user) as AppUser) : null
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
