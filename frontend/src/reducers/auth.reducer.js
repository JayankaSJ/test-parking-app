import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    user: {
        id: null,
        email: null
    }
};

const counterSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated(state) {
            return {
                ...state,
                isAuthenticated: true
            }
        },
        unsetIsAuthenticated(state) {
            return {
                ...state,
                isAuthenticated: false
            }
        },
        signIn(state, action) {
            return {
                ...state,
                accessToken: action.payload,
                isAuthenticated: true
            }
        },
        signOut(state) {
            return {
                ...state,
                accessToken: undefined,
                isAuthenticated: false
            }
        }
    },
    extraReducers: {

    },
})

export const { signIn, signOut, setIsAuthenticated, unsetIsAuthenticated } = counterSlice.actions
export default counterSlice.reducer