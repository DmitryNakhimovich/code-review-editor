import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import { httpClient } from './helpers/dataProvider';
import { HOST_PROVIDER } from './constants/Host';
import { IUserState } from './redux/reducers/user';

(async () => {
  let initialState = {};
  try {
    const initialUser: IUserState = await httpClient(`${HOST_PROVIDER}/users/me`).then((data: any) => data.json);
    initialState = {
      user: initialUser,
    };
  } catch (e) {
    console.warn('При загрузке произошла ошибка');
  }

  ReactDOM.render(<App initialState={initialState} />, document.getElementById('root'));
})();

serviceWorker.unregister();
