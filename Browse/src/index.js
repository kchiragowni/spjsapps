/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { loadRemoteContracts } from './actions/contractActions';
import App from './containers/App';
import configureStore from './store/configureStore';
import '../node_modules/office-ui-fabric-react/dist/css/fabric.min.css';
const store = configureStore();
store.dispatch(loadRemoteContracts());

const rootEl = document.getElementById('app');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootEl
);
