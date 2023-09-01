import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    like: [],
    dislike: [],
    tags: {}
}

export const animeProfileSlice = createSlice({
    name: 'animeProfile',

    initialState: initialState,

    reducers:{
        addLike: (state, action) => {
            state.like.push(action.payload.id)

            action.payload.genres.forEach(genre => {
                if(state.tags[genre.name] !== undefined){
                    state.tags[genre.name] += 1
                } else{
                    state.tags[genre.name] = 1
                }
            })
        },

        addDislike: (state, action) => {
            state.dislike.push(action.payload.id)

            action.payload.genres.forEach(genre => {
                if(state.tags[genre.name] !== undefined){
                    state.tags[genre.name] -= 1
                } else{
                    state.tags[genre.name] = -1
                }
            })
        }
    }
})

export default animeProfileSlice.reducer