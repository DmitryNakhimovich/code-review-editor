import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';
import App from './components/Admin';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
