import { configureStore } from '@reduxjs/toolkit'
import malSlice from './slices/malSlice'

export default configureStore({
  reducer: {
    mal: malSlice
  }
})