import { initReactQueryAuth } from "react-query-auth";
import {
  getUserProfile,
  loginWithEmailAndPassword,
  User
} from "../service/api";
import { cookieSetting } from "../../utils";

export async function handleUserResponse(data: any) {
  const { jwtToken, userName, roles } = data;
  cookieSetting.set('token',jwtToken);
  const user={
    roles,
    userName
  }
  return user;
}

async function loadUser() {
  let user = null;
  if (cookieSetting.get('token') !== undefined) {
    // const data = await getUserProfile('68350f36-300d-43f1-b4da-922dc5263d9c');
    // user = data;
  }
  return null;
}

async function loginFn(data) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  await cookieSetting.clear();
}
async function registerFn(data) {
  // const response = await registerWithEmailAndPassword(data);
  // const user = await handleUserResponse(response);
  return null;
}

const authConfig = {
  loadUser,
  loginFn,
  logoutFn,
  registerFn
};

const { AuthProvider, useAuth } = initReactQueryAuth<User>(authConfig);

export { AuthProvider, useAuth };
