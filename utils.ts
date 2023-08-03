import cookie from 'js-cookie'

export const cookieSetting = {
    get: (name: string) => cookie.get(name),
    set: (name: string,token: any) =>
    cookie.set(name, JSON.stringify(token)),
    clear: () => cookie.remove("token")
  };