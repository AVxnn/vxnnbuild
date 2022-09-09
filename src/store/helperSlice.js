import {createSlice} from "@reduxjs/toolkit";

const helperSlice = createSlice({
    name: 'helper',
    initialState: {
        title: '',
        error: false,
        active: false,
        notification: '',
        wow: null
    },
    reducers: {
        addTitle: (state, action) => {
            state.title = action.payload
        },
        changeError: (state, action) => {
            state.error = action.payload
        },
        addNotification: (state, action) => {
            state.notification = action.payload
        },
        changeActive: (state, action) => {
            state.active = action.payload
        },
        addWow: (state, action) => {
            state.wow = action.payload
        }
    }
})

export const { addTitle, changeError, addNotification, changeActive, addWow } = helperSlice.actions

export default helperSlice.reducer