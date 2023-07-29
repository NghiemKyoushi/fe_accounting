import { initReactQueryAuth } from "react-query-auth";
import {
  getUserProfile,
  loginWithEmailAndPassword,
  User
} from "../service/api";
import { storage } from "../../utils";

export async function handleUserResponse(data) {
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
}

async function loadUser() {
  let user = null;

  if (storage.getToken()) {
    const data = await getUserProfile();
    user = data;
  }
  return user;
}

async function loginFn(data) {
  console.log("data 111", data)
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  await storage.clearToken();
}

const authConfig = {
  loadUser,
  loginFn,
  logoutFn
};

const { AuthProvider, useAuth } = initReactQueryAuth<User>(authConfig);

export { AuthProvider, useAuth };
