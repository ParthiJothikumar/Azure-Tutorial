import { configureStore, combineReducers } from '@reduxjs/toolkit'
import blogReducer from '../features/blog/blogSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import loginReducer from '../features/Login/loginSlice'

const rootReducer = combineReducers({
    blog: blogReducer,
    login: loginReducer,
})

const persistConfig = {
    key: 'login',
    storage,
    blacklist: ['user', 'token', 'error', 'tokenError', 'logoutError']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)