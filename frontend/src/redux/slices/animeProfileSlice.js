import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import MyAnimeList from '../../services/mal'

const initialState = {
    like: [],
    dislike: [],
    tags: {}
}

export const animeProfileSlice = createSlice({
    name: 'animeProfile',

    initialState: initialState,

    extraReducers: builder => {
        builder
        .addCase(addLike.fulfilled, (state, action) => {
            state.like.push(action.payload.id)

            action.payload.genres.forEach(genre => {
                if(state.tags[genre.name] !== undefined){
                    state.tags[genre.name] += 1
                } else{
                    state.tags[genre.name] = 1
                }
            })
        })
        .addCase(addDislike.fulfilled, (state, action) => {
            state.dislike.push(action.payload.id)

            action.payload.genres.forEach(genre => {
                if(state.tags[genre.name] !== undefined){
                    state.tags[genre.name] -= 1
                } else{
                    state.tags[genre.name] = -1
                }
            })
        })
    }
})

const client = new MyAnimeList()
export const addLike = createAsyncThunk('animeProfile/addLike', async showId => {
    const resp = await client.getShowTags(showId)
    return resp
})

export const addDislike = createAsyncThunk('animeProfile/addDislike', async showId => {
    const resp = await client.getShowTags(showId)
    return resp
})

export default animeProfileSlice.reducer