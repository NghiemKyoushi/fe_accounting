import { cookieSetting } from "../../utils";
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

export async function handleApiResponse(response) {
  if (response.status == 200) {
    return response.data;
  } else {
    return Promise.reject(response.data);
  }
}

export async function getUserProfile(userId: string) {
  return await axiosInstance.get(`/api/users/${userId}`).then(handleApiResponse);
}

export async function loginWithEmailAndPassword(data) {
  return axiosInstance.post(`/api/auth/login`, data).then(handleApiResponse);
}
