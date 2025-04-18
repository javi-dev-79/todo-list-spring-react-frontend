import axios from 'axios'
import { AppUser } from '../types/appUser'
import { authApi } from './authApi'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

class UserApi {
  private static instance: UserApi

  private constructor() {}

  public static getInstance(): UserApi {
    if (!UserApi.instance) {
      UserApi.instance = new UserApi()
    }
    return UserApi.instance
  }

  public async getUsers(): Promise<AppUser[]> {
    return axios
      .get(`${API_BASE_URL}/users`, { headers: authApi.getAuthHeaders() })
      .then((response) => {
        console.log('🔹 Datos recibidos de la API:', response.data)
        return response.data
      })
      .catch((error) => {
        console.error('Error obteniendo usuarios:', error)
        throw error
      })
  }

  public async getUserById(userId: string): Promise<AppUser> {
    return axios
      .get(`${API_BASE_URL}/users/${userId}`, { headers: authApi.getAuthHeaders() })
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error obteniendo usuario con id ${userId}:`, error)
        throw error
      })
  }

  public async getUserByEmail(email: string): Promise<AppUser> {
    const token = sessionStorage.getItem('token')

    console.log('El token obtenido en getUserByEmail es: ', token)

    if (!token) {
      console.error('❌ No hay token disponible, posible error de autenticación.')
      throw new Error('No hay token de autenticación.')
    }

    console.log('🔹 Enviando solicitud GET para obtener usuario:', email)
    console.log(`Token enviado en headers es: Bearer ${token}`)

    return axios
      .get<AppUser>(`${API_BASE_URL}/users/email/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log('✅ Respuesta de getUserByEmail:', response.data)
        return response.data
      })
      .catch((error) => {
        console.error(
          `❌ Error obteniendo usuario con email ${email}:`,
          error.response?.data || error
        )
        throw error
      })
  }

  public async updateUser(userId: string, updatedUser: Partial<AppUser>): Promise<AppUser> {
    const token = sessionStorage.getItem('token')

    console.log('🔹 Enviando a la API:', updatedUser)

    return axios
      .put<AppUser>(`${API_BASE_URL}/users/${userId}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('❌ Error en updateUser:', error)
        throw error
      })
  }

  public async updateUserRole(userId: string, newRole: string): Promise<void> {
    const token = sessionStorage.getItem('token')

    console.log(`🔹 Cambiando rol del usuario ${userId} a ${newRole}`)

    return axios
      .put(
        `${API_BASE_URL}/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(() => console.log('✅ Rol actualizado correctamente'))
      .catch((error) => {
        console.error('❌ Error actualizando el rol:', error)
        throw error
      })
  }

  public async deleteUser(userId: string): Promise<void> {
    return axios
      .delete(`${API_BASE_URL}/users/${userId}`, { headers: authApi.getAuthHeaders() })
      .then(() => console.log(`Usuario con id ${userId} eliminado`))
      .catch((error) => {
        console.error(`Error eliminando usuario con id ${userId}:`, error)
        throw error
      })
  }
}

export const userApi = UserApi.getInstance()
