import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
    isAuth: boolean;
    jid: string;
}

const initialState: IAuthState = {
    isAuth: false,
    jid: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setJid: (state, action: PayloadAction<string>) => {
            state.jid = action.payload;
        },
    },
})

export const { setAuth, setJid } = authSlice.actions;

export const authReducer = authSlice.reducer;