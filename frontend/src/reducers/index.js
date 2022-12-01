import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth.reducer';
import slotsReducer from './slots.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    slots: slotsReducer,
});

export default rootReducer;