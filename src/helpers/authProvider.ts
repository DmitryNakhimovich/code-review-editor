import Cookies from './Cookies';
import { HOST_PROVIDER } from '../constants/Host';

interface ILogin {
  username: string;
  password: string;
}

interface ICheckError {
  status: number;
}

export default {
  login: ({ username, password }: ILogin) => {
    const identifier = username;
    const request = new Request(`${HOST_PROVIDER}/auth/local`, {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(response => {
        Cookies.setCookie('token', response.jwt, 1);
        Cookies.setCookie('role', response.user.role.name, 1);
        return response.user;
      });
  },

  logout: () => {
    Cookies.deleteCookie('token');
    Cookies.deleteCookie('role');
    return Promise.resolve();
  },

  checkAuth: () => (Cookies.getCookie('token') ? Promise.resolve() : Promise.reject()),

  checkError: ({ status }: ICheckError) => {
    if (status === 401 || status === 403) {
      Cookies.deleteCookie('token');
      Cookies.deleteCookie('role');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => {
    const role = Cookies.getCookie('role');
    return role ? Promise.resolve(role) : Promise.reject();
  },
};
