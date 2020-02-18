import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './styles/theme';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
