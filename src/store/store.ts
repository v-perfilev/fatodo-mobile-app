import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './index';

const defaultMiddlewares = [thunkMiddleware, promiseMiddleware];
const composedMiddlewares = applyMiddleware(...defaultMiddlewares);

export default createStore(reducer, composedMiddlewares);
