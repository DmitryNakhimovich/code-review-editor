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
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
