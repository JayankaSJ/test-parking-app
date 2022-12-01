import { createSelector } from '@reduxjs/toolkit'

export const getSlots = createSelector((state) => state, (state) => {
    return state.slots.items
})

export const getSlotsLoading = createSelector((state) => state, (state) => {
    return state.slots.isLoading
})
