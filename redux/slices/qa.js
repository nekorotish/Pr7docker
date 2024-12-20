import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";
import {fetchTags} from "./posts";

export const fetchQas = createAsyncThunk('qa/fetchQas', async (id) => {
    console.log(id)
    const {data} = await axios.get(`/qapostgresql/qa/user/${id}`);
    console.log(data)
    return data;
});
export const fetchQa = createAsyncThunk('qa/fetchQa', async (id) => {
    console.log(id)
    const {data} = await axios.get(`/qapostgresql/qa/${id}`);
    console.log(data)
    return data;
});
export const fetchCreateQa = createAsyncThunk('qa/fetchCreateQa', async (id) => {
    const {data} = await axios.post(`/qapostgresql/qa`,id);
    console.log(data)
    return data;
});
export const fetchUpdateQa = createAsyncThunk('qa/fetchUpdateQa', async (id) => {
    const {data} = await axios.patch(`/qapostgresql/qa/${id.q_id}`,id);
    console.log(data)
    return data;
});
export const fetchDeleteQa = createAsyncThunk('qa/fetchDeleteQa', async (id) => {
    await axios.delete(`/qapostgresql/qa/${id}`);

});
const initialState = {
    qas: {
        items: [],
        status: 'loading'
    },
    qa: {
        items: [],
        status: 'loading'
    },
};
const qaSlice = createSlice({
    name: 'qa',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchQas.pending, (state) => {
            state.qas.items = [];
            state.qas.status = 'loading';
        });
        builder.addCase(fetchQas.fulfilled, (state, action) => {
            state.qas.items = action.payload;
            state.qas.status = 'loaded';
        });
        builder.addCase(fetchQas.rejected, (state) => {
            state.qas.items = [];
            state.qas.status = 'error';
        });
        builder.addCase(fetchQa.pending, (state) => {
            state.qa.items = [];
            state.qa.status = 'loading';
        });
        builder.addCase(fetchQa.fulfilled, (state, action) => {
            state.qa.items = action.payload;
            state.qa.status = 'loaded';
        });
        builder.addCase(fetchQa.rejected, (state) => {
            state.qa.items = [];
            state.qa.status = 'error';
        });
    }
});
export const qaReducer = qaSlice.reducer;