import { jsbase } from "@/helper/files";
import { createSlice } from "@reduxjs/toolkit";


//  editorREf, zoomLevel, 
const initialState = {
  zoomLevel: 15,
  editorRef: null,
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
      state.editorRef = action.payload;
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