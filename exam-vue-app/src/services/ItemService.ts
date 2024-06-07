import type { IItem } from '@/types/IItem'
import axios from 'axios'

const apiKey = 'ddc0daa0-eda5-4a1a-9ae1-ce0787f8742c'
const version = 'v1'
const baseUrl = `https://taltech.akaver.com/api/${version}/ListItems`

class ItemService {
  static async getAll(completed?: boolean) {
    let url = `${baseUrl}?apiKey=${apiKey}`
    if (completed !== undefined) {
      url += `&completed=${completed}`
    }
    const response = await axios.get<IItem[]>(url)
    return response.data
  }

  static async getById(id: string) {
    const response = await axios.get<IItem>(`${baseUrl}/${id}?apiKey=${apiKey}`)
    return response.data
  }

  static async create(item: Omit<IItem, 'id'>) {
    const response = await axios.post(`${baseUrl}?apiKey=${apiKey}`, item, {
      headers: { 'Content-Type': 'application/json' }
    })
    return response.data
  }

  static async update(item: IItem) {
    const response = await axios.put(`${baseUrl}/${item.id}?apiKey=${apiKey}`, item, {
      headers: { 'Content-Type': 'application/json' }
    })
    return response.data
  }

  static async delete(id: string) {
    const response = await axios.delete(`${baseUrl}/${id}?apiKey=${apiKey}`)
    return response.data
  }
}

export default ItemService
