import { createSelector } from '@reduxjs/toolkit'

export const getIsAuthenticated = createSelector((state) => state, (state) => {
    return state.auth.isAuthenticated
})
