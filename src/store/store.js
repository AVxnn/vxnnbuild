import helperSlice from "./helperSlice";
import {configureStore} from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        helper: helperSlice
    }
})
