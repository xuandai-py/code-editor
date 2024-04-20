import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface BundleState {
    code: string;
    err: string;
}

const initialBundleState: BundleState = {
    code: '',
    err: '',
};


export const bundleSlice = createSlice({
    name: 'bundle',
    initialState: initialBundleState,
    reducers: {
        setCode: (state, action: PayloadAction<string>) => {
            state.code = action.payload;
        },
        setErr: (state, action: PayloadAction<string>) => {
            state.err = action.payload;
        },
    },
});


export const { setCode, setErr } = bundleSlice.actions;

export const bundleReducer = bundleSlice.reducer;