import { storage } from "../../utils";
import axiosInstance from "@/config";
interface AuthResponse {
  user: User;
  jwt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

const API_URL = process.env.BE_BASE_URL;

export async function handleApiResponse(response) {
  if (response.status == 200) {
    return response.data;
  } else {
    return Promise.reject(data);
  }
}

export async function getUserProfile() {
  return await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization:storage.getToken(),
    },
  }).then(handleApiResponse);
}

export async function loginWithEmailAndPassword(data) {
  return axiosInstance.post(`/api/auth/login`, data).then(handleApiResponse);
}
