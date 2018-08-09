import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.sass';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './store/reducers/reducer';

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
