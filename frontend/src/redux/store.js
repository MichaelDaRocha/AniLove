import { configureStore } from '@reduxjs/toolkit'
import malSlice from './slices/malSlice'
import animeProfileSlice from './slices/animeProfileSlice'

export default configureStore({
  reducer: {
    mal: malSlice,
    animeProfile: animeProfileSlice
  }
})