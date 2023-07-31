import { initReactQueryAuth } from "react-query-auth";
import {
  getUserProfile,
  loginWithEmailAndPassword,
  User
} from "../service/api";
import { cookieSetting } from "../../utils";

export async function handleUserResponse(data: any) {
  const { jwtToken, userName, roles } = data;
  cookieSetting.set(jwtToken);
  const user={
    roles,
    userName
  }
  return user;
}

async function loadUser() {
  // let user = null;

  // if (storage.getToken()) {
  //   const data = await getUserProfile();
  //   user = data;
  // }
  return null;
}

async function loginFn(data) {
  console.log("data 111", data)
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
