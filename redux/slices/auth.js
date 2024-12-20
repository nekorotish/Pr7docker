import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchPosts} from "./posts";
import axios from "../../axios";
import i18next from "../../services/i18next";
import * as SecureStore from "expo-secure-store";

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const {data} = await axios.post('/userpostgresql/auth/login', params);
    console.log(data)
    return data;
});
export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const {data} = await axios.post('/userpostgresql/auth/register', params);
    console.log(data)
    return data;
});
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const {data} = await axios.get('/userpostgresql/auth/me');
    console.log(data)
    return data;
});
export const fetchRecoverPassword = createAsyncThunk('auth/fetchRecoverPassword', async (params) => {
    const {data} = await axios.patch('/userpostgresql/auth/recover_password', params);
    console.log(data)
    return data;
});
export const fetchChangeProfileImg = createAsyncThunk('auth/fetchChangeProfileImg', async (params) => {
    const {data} = await axios.patch('/userpostgresql/auth/changeProfileImg', params);
    console.log(data)
    return data;
});
export const fetchChangeProfileData = createAsyncThunk('auth/fetchChangeProfileData', async (params) => {
    const {data} = await axios.patch('/userpostgresql/auth/changeProfileData', params);
    // console.log(data)
    return data;
});
export const fetchChangePassword = createAsyncThunk('auth/fetchChangePassword', async (params) => {
    const {data} = await axios.patch('/userpostgresql/auth/changePassword', params);
    console.log(data)
    return data;
});
const initialState = {
    data: null,
    postgres: 1,
    status: 'loading',
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            i18next.changeLanguage("rus");
            state.data = null;
            console.log("user now is logout")

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.data = null;
            state.status = 'loading';
        });
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            if (state.postgres === 1) {
                const postsget = action.payload;
                const accdetails = {
                    avatarUrl: postsget.avatarurl,  // Присваиваем imageUrl из imageurl
                    _id: postsget._id,
                    fullName: postsget.fullname,
                    email: postsget.email,
                    passwordHash: postsget.passwordhash,
                    createdAt: postsget.createdat,  // Присваиваем createdAt из created_at
                    updatedAt: postsget.updatedat,  // Присваиваем updatedAt из updated_at
                    user_role_id: postsget.user_role_id,
                    // Добавьте остальные поля по аналогии
                };


                state.data = accdetails;
                state.status = 'loaded';

            } else {

                state.data = action.payload;
                state.status = 'loaded';

                console.log(action.payload.fullName)
            }
        });
        builder.addCase(fetchAuth.rejected, (state) => {
            state.data = null;
            state.status = 'error';
        });
        builder.addCase(fetchAuthMe.pending, (state) => {
            state.data = null;
            state.status = 'loading';
        });
        builder.addCase(fetchAuthMe.fulfilled,  (state, action) => {
            if (state.postgres === 1) {
                const postsget = action.payload;
                const accdetails = {
                    avatarUrl: postsget.avatarurl,  // Присваиваем imageUrl из imageurl
                    _id: postsget._id,
                    fullName: postsget.fullname,
                    email: postsget.email,
                    passwordHash: postsget.passwordhash,
                    createdAt: postsget.createdat,  // Присваиваем createdAt из created_at
                    updatedAt: postsget.updatedat,  // Присваиваем updatedAt из updated_at
                    user_role_id: postsget.user_role_id,
                    // Добавьте остальные поля по аналогии
                };


                state.data = accdetails;
                state.status = 'loaded';


            } else {
                state.data = action.payload;
                state.status = 'loaded';

                // console.log(action.payload.fullName)
            }

        });
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.data = null;
            state.status = 'error';
        });
        builder.addCase(fetchRegister.pending, (state) => {
            state.data = null;
            state.status = 'loading';
        });
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            if (state.postgres === 1) {
                const postsget = action.payload;
                const accdetails = {
                    avatarUrl: postsget.avatarurl,  // Присваиваем imageUrl из imageurl
                    _id: postsget._id,
                    fullName: postsget.fullname,
                    email: postsget.email,
                    passwordHash: postsget.passwordhash,
                    createdAt: postsget.createdat,  // Присваиваем createdAt из created_at
                    updatedAt: postsget.updatedat,  // Присваиваем updatedAt из updated_at
                    user_role_id: postsget.user_role_id,
                    // Добавьте остальные поля по аналогии
                };
                state.status = 'loaded';
                state.data = accdetails;
            } else {
                state.data = action.payload;
                state.status = 'loaded';

                console.log(action.payload.fullName)
            }
        });
        builder.addCase(fetchRegister.rejected, (state) => {
            state.data = null;
            state.status = 'error';
        });
    }
})
export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions;