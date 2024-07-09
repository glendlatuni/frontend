import axios from "axios";

const API_URL = "http://localhost:4000"; // Sesuaikan dengan URL backend Anda

export const findallkeluarga = async () => {
  try {
    const response = await axios.get(`${API_URL}/find-all-keluarga`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const countUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/count-user`);
    return response.data.count;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const countKeluarga = async () => {
  try {
    const response = await axios.get(`${API_URL}/count-keluarga`);

    return response.data.count;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const createKeluarga = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/create-keluarga`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};



export const createUser = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/create-user`, data);
    return response.data.user;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
}