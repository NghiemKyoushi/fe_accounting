import { storage } from "../../utils";

interface AuthResponse {
  user: User;
  jwt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

const API_URL = "https://my-server/api";

export async function handleApiResponse(response) {
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
}

export async function getUserProfile() {
  return await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: storage.getToken()
    }
  }).then(handleApiResponse);
}

export async function loginWithEmailAndPassword(data): Promise<AuthResponse> {
  console.log("data2", data)
  return window
    .fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(handleApiResponse);
}

