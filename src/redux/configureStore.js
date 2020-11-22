import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {rows} from './rowsReducer';

export const ConfigureStore = () => {
    const store = createStore(rows,applyMiddleware(thunk,logger));

    return store;
}

