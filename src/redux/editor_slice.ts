import { jsbase } from "@/helper/files";
import { Editor } from "@monaco-editor/react";
import { createSlice } from "@reduxjs/toolkit";
import { editor as monaco } from 'monaco-editor';
import { LangSyntax } from '@/helper/constant'


interface EditorActionPayload {
  language: string;
  editor: monaco.IStandaloneCodeEditor;
}
// declare const editorRef: Array<EditorActionPayload>;
//  editorREf, zoomLevel, 
export interface EditorState {

}
const language: LangSyntax = "typescript";
const initialState = {
  zoomLevel: 15,
  frameHeight: 800,
  editorRef: [],
  bundle: false,
  script: jsbase, 
  scriptBundleOption: language,
}




export const editor = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditorRef: (state, action) => {
      const payload: EditorActionPayload = action.payload;
      state.editorRef.push(payload);
    },
    setScriptBundleOption: (state, action) => {
      state.scriptBundleOption = action.payload;
    },

    getFrameHeight: (state, action) => {
      state.frameHeight = action.payload;
    },

    getZoomLevel: (state, action) => {
      state.zoomLevel = action.payload;
    },


    setBundle: (state, action) => {
      state.bundle = action.payload;
    },

    setScript: (state, action) => {
      state.script = action.payload;
    }
  },
});

export const { setScript, getZoomLevel, setEditorRef, getFrameHeight, setBundle } = editor.actions;

export default editor.reducer;