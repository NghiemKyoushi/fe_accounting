import cookie from 'js-cookie'

export const cookieSetting = {
    get: (name: string) => cookie.get(name),
    set: (name: string,token: string) =>
    cookie.set(name, token , {expires: 3600}),
    clear: (name:string) => cookie.remove(name)
  };