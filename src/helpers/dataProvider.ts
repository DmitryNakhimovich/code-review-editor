import Cookies from './Cookies';
import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-strapi-rest';

interface IOptions {
  headers?: Headers;
}

const httpClient = (url: string, options: IOptions = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = Cookies.getCookie('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

export const dataProvider = simpleRestProvider('http://localhost:1337', httpClient);
