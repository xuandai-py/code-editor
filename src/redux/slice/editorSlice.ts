import { jsbase } from "@/helper/files";
import { Editor } from "@monaco-editor/react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { editor } from 'monaco-editor';
import { LangSyntax } from '@/helper/constant'


interface EditorActionPayload {
    editor: editor.IStandaloneCodeEditor | null;
}
const data: EditorActionPayload = {
    editor: null
}
// declare const editorRef: Array<EditorActionPayload>;
//  editorREf, zoomLevel, 
export interface EditorState {
    zoomLevel: number,
    frameHeight: number,
    autoBundleState: boolean,
    script: string,
    scriptBundlerOption: string,
    editorRef: [],
    editorRefObject: {
        [language: string]: EditorActionPayload
    }
}
const initialState: EditorState = {
    zoomLevel: 15,
    frameHeight: 800,
    autoBundleState: false,
    script: jsbase,
    scriptBundlerOption: 'esbuild',
    editorRef: [], // [{ current: null }, ...]
    editorRefObject: {
        ['']: data,
    }
}




export const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        // write setEditor reducer here suite with initialState.editorRef
        setEditorRef: (state, action) => {
            state.editorRef.push(action.payload);
        },
        setEditorRefObjet: (state, action) => {
            state.editorRefObject = {
                ...state.editorRefObject,
                [action.payload.language]: action.payload
                // [action.payload.language]: action.payload.editor
            }
        },

        setScriptBundleOption: (state, action) => {
            state.scriptBundlerOption = action.payload;
        },

        setFrameHeight: (state, action: PayloadAction<number>) => {
            state.frameHeight = action.payload;
        },

        setZoomLevel: (state, action: PayloadAction<number>) => {
            state.zoomLevel = action.payload;
        },


        setAutoBundleState: (state, action: PayloadAction<boolean>) => {
            state.autoBundleState = action.payload;
        },

        setScript: (state, action: PayloadAction<string>) => {
            state.script = action.payload;
        }
    },
});

export const { setScript, setEditorRefObjet, setZoomLevel, setEditorRef, setFrameHeight, setAutoBundleState } = editorSlice.actions;

export const editorReducer = editorSlice.reducer;