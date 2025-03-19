import axios from 'axios'
import { Task } from '../types/task'
import { TaskStatus } from '../types/taskStatus'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

class TaskApi {
  private static instance: TaskApi

  private constructor() {}

  public static getInstance(): TaskApi {
    if (!TaskApi.instance) {
      TaskApi.instance = new TaskApi()
    }
    return TaskApi.instance
  }

  public async fetchTasks(userId: string, taskListId: string): Promise<Task[]> {
    const token = sessionStorage.getItem('token')

    if (!token) {
      console.error('❌ No hay token disponible, posible error de autenticación.')
      throw new Error('No hay token de autenticación.')
    }

    console.log('🔹 Enviando solicitud GET para obtener tareas. Token:', token)

    return axios
      .get<Task[]>(`${API_BASE_URL}/users/${userId}/tasklists/${taskListId}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('❌ Error obteniendo tareas:', error.response?.data || error)
        throw error
      })
  }

  public async fetchTaskById(
    userId: string,
    taskListId: string,
    taskId: string
  ): Promise<Task | null> {
    return axios
      .get<Task>(`${API_BASE_URL}/users/${userId}/tasklists/${taskListId}/tasks/${taskId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error obteniendo task con id ${taskId}:`, error)
        throw error
      })
  }

  public async addTask(userId: string, taskListId: string, task: Omit<Task, 'id'>): Promise<Task> {
    const token = sessionStorage.getItem('token')

    return axios
      .post<Task>(`${API_BASE_URL}/users/${userId}/tasklists/${taskListId}/tasks`, task, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log('✅ Task añadida correctamente:', response.data)
        return response.data
      })
      .catch((error) => {
        console.error('❌ Error añadiendo task:', error)
        throw error
      })
  }

  public async updateTask(
    userId: string,
    taskListId: string,
    taskId: string,
    updatedTask: Partial<Task>
  ): Promise<Task> {
    return axios
      .put<Task>(
        `${API_BASE_URL}/users/${userId}/tasklists/${taskListId}/tasks/${taskId}`,
        updatedTask
      )
      .then((response) => {
        console.log(`Task con id ${taskId} actualizada:`, response.data)
        return response.data
      })
      .catch((error) => {
        console.error(`Error actualizando task con id ${taskId}:`, error)
        throw error
      })
  }

  public async updateTaskStatus(
    userId: string,
    taskListId: string,
    taskId: string,
    newStatus: TaskStatus
  ): Promise<Task> {
    const token = sessionStorage.getItem('token')

    return axios
      .put<Task>(
        `${API_BASE_URL}/users/${userId}/tasklists/${taskListId}/tasks/${taskId}/status`,
        { taskStatus: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error('❌ Error actualizando estado de la tarea:', error.response?.data || error)
        throw error
      })
  }

  public async deleteTask(userId: string, taskListId: string, taskId: string): Promise<void> {
    return axios
      .delete(`${API_BASE_URL}/users/${userId}/tasklists/${taskListId}/tasks/${taskId}`)
      .then(() => console.log(`Task con id ${taskId} eliminada`))
      .catch((error) => {
        console.error(`Error eliminando task con id ${taskId}:`, error)
        throw error
      })
  }
}

export const taskApi = TaskApi.getInstance()
