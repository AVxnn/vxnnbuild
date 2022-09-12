import helperSlice from "./helperSlice";
import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";

export default configureStore({
    reducer: {
        helper: helperSlice,
        user: userSlice
    }
})
