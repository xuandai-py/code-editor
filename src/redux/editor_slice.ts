import { jsbase } from "@/helper/files";
import { Editor } from "@monaco-editor/react";
import { createSlice } from "@reduxjs/toolkit";
import { editor as monaco } from 'monaco-editor';



interface EditorActionPayload {
  language: string;
  editor: monaco.IStandaloneCodeEditor;
}
// declare const editorRef: Array<EditorActionPayload>;

//  editorREf, zoomLevel, 
const initialState = {
  zoomLevel: 15,
  editorRef: [],
  frameHeight: 800,
  bundle: false,
  script: jsbase
}




export const editor = createSlice({
  name: "editor",
  initialState,
  reducers: {
    getFrameHeight: (state, action) => {
      state.frameHeight = action.payload;
    },

    getZoomLevel: (state, action) => {
      state.zoomLevel = action.payload;
    },

    setEditorRef: (state, action) => {
      const payload: EditorActionPayload = action.payload;
      state.editorRef.push(payload);
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