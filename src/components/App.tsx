import React from 'react';
import { fetchUtils, Admin, Resource, ListGuesser } from 'react-admin';
import simpleRestProvider from 'ra-strapi-rest';
import Cookies from '../helpers/Cookies';
import authProvider from '../helpers/authProvider';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
import CssBaseline from '@material-ui/core/CssBaseline';

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

const dataProvider = simpleRestProvider('http://localhost:1337', httpClient);

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const App = () => (
  <>
    <CssBaseline />
    <Admin i18nProvider={i18nProvider} authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="courses" list={ListGuesser} />
    </Admin>
  </>
);

export default App;
