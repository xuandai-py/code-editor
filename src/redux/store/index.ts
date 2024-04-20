import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { authReducer } from "../../reduxTLK/slices/authSlice";
import storage from "./customStorage";
import logger from "redux-logger";
import { editorReducer } from "../slice/editorSlice";
import { bundleReducer } from "../slice/bundleSlice";
import { utilReducer } from "../slice/utilSlice";

const editorPersistConfig = {
  key: "editor",
  storage: storage,
}

const bundlePersistConfig = {
  key: "bundle",
  storage: storage,

}
const utilPersistConfig = {
  key: "util",
  storage: storage,

}



const rootReducer = combineReducers({
  // auth: persistReducer(authPersistConfig, authReducer),
  editor: persistReducer( editorPersistConfig, editorReducer),
  bundle: persistReducer( bundlePersistConfig, bundleReducer),
  util: persistReducer( utilPersistConfig, utilReducer)
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;