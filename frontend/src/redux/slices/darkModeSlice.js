import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarkMode: true
}

export const darkModeSlice = createSlice({
    name: "darkMode",
    initialState: initialState,
    reducers: {
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload
        },
        toggleDarkMode: state => {
            state.isDarkMode = !state.isDarkMode
        }
    }
})

export const { setDarkMode, toggleDarkMode } = darkModeSlice.actions

export default darkModeSlice.reducer