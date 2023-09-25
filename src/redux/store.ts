import { configureStore } from "@reduxjs/toolkit";
import { editor } from "./editor_slice";
import  { bundleSlice } from "./bundle_slice";

export const store = configureStore({
	reducer: {
		editor: editor.reducer,
		bundle: bundleSlice.reducer

	},

	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApiSlice.middleware),

	devTools: true
});