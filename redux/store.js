import {configureStore} from "@reduxjs/toolkit";
import {postsReducer} from "./slices/posts";
import {authReducer} from "./slices/auth";
import {qaReducer} from "./slices/qa";

const store = configureStore({
    reducer:{
        posts: postsReducer,
        auth: authReducer,
        qa: qaReducer,
    }
});
export default store;