import axios from 'axios'

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
      .post(`${API_BASE_URL}/auth/login`, { email, password })
      .then((response) => {
        const token = response.data.token
        localStorage.setItem('token', token)
        return token
      })
      .catch((error) => {
        console.error('Error en el login:', error)
        throw error
      })
  }

  public async register(name: string, email: string, password: string): Promise<void> {
    return axios
      .post(`${API_BASE_URL}/auth/register`, { name, email, password })
      .then(() => console.log('register response:'))
      .catch((error) => {
        console.error('Error en el registro:', error)
        throw error
      })
  }

  public logout(): void {
    localStorage.removeItem('token')
  }

  public getToken(): string | null {
    return localStorage.getItem('token')
  }

  public isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

export const authApi = AuthApi.getInstance()
