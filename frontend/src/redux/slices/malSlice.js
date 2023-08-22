import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    anime: [],
    len: 0
}

export const malSlice = createSlice({
  name: 'mal',
  
  initialState: initialState,

  reducers: {
    remove: (state, action) => {
        state.anime.splice(action.payload, 1)
        --state.len
    },
    add: (state, action) => {
        state.anime.push(action.payload)
        ++state.len
    }
  }
})

export const { add, remove } = malSlice.actions

export default malSlice.reducer