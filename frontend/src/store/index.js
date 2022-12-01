import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';

import rootReducer from '../reducers'
import { isDevelopment } from '../config';

export const useAppDispatch = () => useDispatch()

export function createAppAsyncThunk(
    type,
    thunk,
) {
    return createAsyncThunk(
        type,
        async (arg, thunkAPI) => {
            try {
                // do some stuff here that happens on every action
                return await thunk(arg, thunkAPI)
            } catch (err) {
                // do some stuff here that happens on every error
                return thunkAPI.rejectWithValue(null)
            }
        },
    )
}


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        const defaultMiddleWares = getDefaultMiddleware({
            thunk: true,
            serializableCheck: false,
        });
        if (isDevelopment) {
            defaultMiddleWares.concat(logger);
        }
        return defaultMiddleWares;
    },
    devTools: isDevelopment,
});


