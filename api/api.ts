import axios from "axios";

const API_URL = "http://localhost:4000"; // Sesuaikan dengan URL backend Anda


const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const keluargaApi = {
  create : (data: any) => api.post("/", data),
  findAll: () => api.get("/"),
  findById: (id: string) => api.get(`/${id}`),
  update: (id: string, data: any) => api.put(`/${id}`, data),
  delete: (id: string) => api.delete(`/${id}`),


}



export const apiService = {
  keluarga : keluargaApi
}