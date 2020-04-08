import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import authProvider from '../helpers/authProvider';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createBrowserHistory } from 'history';
import { dataProvider } from '../helpers/dataProvider';

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const history = createBrowserHistory();

// TODO add user from login to redux

const App = () => (
  <>
    <CssBaseline />
    <Admin i18nProvider={i18nProvider} authProvider={authProvider} dataProvider={dataProvider} history={history}>
      <Resource name="courses" list={ListGuesser} />
    </Admin>
  </>
);

export default App;
