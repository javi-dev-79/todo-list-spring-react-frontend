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
      .then((response) => response.data)
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

  public async updateUser(userId: string, updatedUser: Partial<AppUser>): Promise<AppUser> {
    return axios
      .put(`${API_BASE_URL}/users/${userId}`, updatedUser, { headers: authApi.getAuthHeaders() })
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error actualizando usuario con id ${userId}:`, error)
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
