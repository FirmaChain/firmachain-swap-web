import { applyMiddleware, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';

const persistConfig = {
    key: 'root',
    storage
};

export default createStore(persistReducer(persistConfig, reducers), applyMiddleware(ReduxThunk));
