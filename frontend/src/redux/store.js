import { configureStore } from '@reduxjs/toolkit'
import rateReducer from './slices/rateSlice'

export const store = configureStore({
    reducer: {
        rate: rateReducer,
    }
})