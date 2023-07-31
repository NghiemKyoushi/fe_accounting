import cookie from 'js-cookie'

export const cookieSetting = {
    get: () => cookie.get("token"),
    set: (token: any) =>
    cookie.set("token", JSON.stringify(token)),
    clear: () => cookie.remove("token")
  };