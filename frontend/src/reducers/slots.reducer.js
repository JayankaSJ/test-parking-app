import { createSlice } from '@reduxjs/toolkit'
import { fetchSlots } from './thunks/slots.thunk';

const initialState = {
    items: [],
    isLoading: false
};

const counterSlice = createSlice({
    name: 'slots',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [fetchSlots.pending.type] : (state) => {
            state.isLoading = true;
        },
        [fetchSlots.fulfilled.type]: (state, action) => { 
            state.items = action.payload;
            state.isLoading = false;
        },
        [fetchSlots.rejected.type] : (state) => {
            state.isLoading = false;
        },
    },
})

export default counterSlice.reducer