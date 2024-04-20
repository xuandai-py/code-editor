"use client";

import createWebStorage from "redux-persist/es/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getTask(_key: any) {
            return Promise.resolve(null);
        },
        setTask(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeTask(_key: any) {
            return Promise.resolve();
        },
    };
};

////////////////////////////////////////
const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

export default storage;