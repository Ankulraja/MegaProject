import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice"; 
import profileReducer from "../Slices/profileSlice";
import cartReducer from "../Slices/cartSlice";
import viewCourseReducer from "../Slices/viewCourseSlice";
import courseReducer from "../Slices/courseSlice";

const rootReducer = combineReducers({
        auth: authReducer,
        profile:profileReducer,
        cart:cartReducer,
        viewCourse:viewCourseReducer,
        course : courseReducer,
});

export default rootReducer;
