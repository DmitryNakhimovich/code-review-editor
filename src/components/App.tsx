import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import authProvider from '../helpers/authProvider';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createBrowserHistory } from 'history';
import { dataProvider } from '../helpers/dataProvider';
import { IUserState, user } from '../redux/reducers/user';
import Logout from './Auth/Logout';
import Login from './Auth/Login';

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const history = createBrowserHistory();

interface IProps {
  initialState: {
    user?: IUserState;
  };
}

const App = (props: IProps) => (
  <>
    <CssBaseline />
    <Admin
      i18nProvider={i18nProvider}
      authProvider={authProvider}
      dataProvider={dataProvider}
      history={history}
      customReducers={{ user }}
      initialState={props.initialState}
      logoutButton={Logout}
      loginPage={Login}
    >
      <Resource name="courses" list={ListGuesser} />
    </Admin>
  </>
);

export default App;
