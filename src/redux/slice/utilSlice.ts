import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UtilState {
    activeTab: number;
}

const initialUtilState: UtilState = {
    activeTab: 0,
};


export const utilSlice = createSlice({
    name: 'util',
    initialState: initialUtilState,
    reducers: {
        setActiveTab: (state, action: PayloadAction<number>) => {
            state.activeTab = action.payload;
        },
      
    },
});


export const { setActiveTab } = utilSlice.actions;

export const utilReducer = utilSlice.reducer;