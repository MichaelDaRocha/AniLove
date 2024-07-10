import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
    like: {},
    dislike: {},
    neutral: {}
}

const stateChangeRemover = (state, anime) => {
    switch(anime._state){
        case 'like':
            delete state.like[anime.id]
            break
        case 'dislike':
            delete state.dislike[anime.id]
            break
        case 'neutral':
            delete state.neutral[anime.id]
            break
        default:
    }
}

export const rateSlice = createSlice({
    name: "rateSlice",
    initialState: initialState,
    reducers: {
        like: (state, action) => {
            stateChangeRemover(state, action)
            action.payload['_state'] = 'like'
            state.like.push(action.payload)
        },
        dislike: (state, action) => {
            stateChangeRemover(state, action)
            action.payload['_state'] = 'dislike'
            state.dislike.push(action.payload)
        },
        neutral: (state, action) => {
            stateChangeRemover(state, action)
            action.payload['_state'] = 'neutral'
            state.neutral.push(action.payload)
        },
    }
})

export const selectRated = createSelector(
    [
        state => state.rate.like,
        state => state.rate.dislike,
        state => state.rate.neutral
    ],
    (like, dislike, neutral) => {return {...like, ...dislike, ...neutral}}
)

export const { like, dislike, neutral } = rateSlice.actions

export default rateSlice.reducer