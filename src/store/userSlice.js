import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        avatar: '',
        avatarPath: '',
        password: '',
        uid: '',
        online: false,
    },
    reducers: {
        updateUser: (state, action) => {
            state = action.payload
        },
        editName: (state, action) => {
            state.name = action.payload
        },
        editPassword: (state, action) => {
            state.password = action.payload
        },
        editAvatar: (state, action) => {
            state.avatar = action.payload
        },
        editAvatarPath: (state, action) => {
            state.avatarPath = action.payload
        },
        addUid: (state, action) => {
            state.uid = action.payload
        },
        editEmail: (state, action) => {
            state.email = action.payload
        },
        online: (state, action) => {
            state.online = action.payload
        }
    }
})

export const { updateUser, editName, editEmail, addUid, online, editPassword, editAvatar, editAvatarPath } = userSlice.actions

export default userSlice.reducer