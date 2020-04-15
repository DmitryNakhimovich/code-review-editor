import Cookies from './Cookies';
import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-strapi-rest';
import { HOST_PROVIDER } from '../constants/Host';

interface IOptions {
  headers?: Headers;
  [key: string]: any;
}

export const httpClient = (url: string, options: IOptions = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = Cookies.getCookie('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const uploadFields = ['images'];

export const dataProvider = simpleRestProvider(HOST_PROVIDER, httpClient, uploadFields);
