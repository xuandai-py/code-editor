"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import EditorBox from "./code_editor_replace";
import {  useState } from "react";
import { htmlbase, cssbase, jsbase, rustbase } from '@/helper/files'
import Preview from "./preview";
import bundler from "@/helper/bundler";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { setScript } from "@/redux/editor_slice";

interface EditorBoxProps {
  defaultLayout: number[];
  type: string
  // initialValue: string;
  // onChange(value: string | undefined): void;
  // onChangeHTML(value: string | undefined): void;
  // onChangeCSS(value: string | undefined): void;
}


const PanelWrapperInner: React.FC<EditorBoxProps> = (
  {
    defaultLayout,
    type
  }
) => {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  const [html, setHtml] = useState(htmlbase)
  const [css, setCss] = useState(cssbase)

  const dispatch = useDispatch();


  const { frameHeight, editorRef } = useSelector((state) => state.editor);
  const { code, err } = useSelector((state) => state.bundle);

  const handleInputChangeHTML = (input: string) => {
    // console.log('html: ', input);
    setHtml(input)
  }
  const handleInputChangeCSS = (input: string) => {
    // console.log('html: ', input);
    setCss(input)
  }
  const handleInputChangeJS = (input: string) => {
    // console.log('html: ', input);
    dispatch(setScript(input))
  }

  return (
    <Box sx={{ bgcolor: '#cfe8fc', height: `${frameHeight}px` }} >
      {type === 'js'
        ?
        <JSPanel
          onLayout={onLayout}
          defaultLayout={defaultLayout}
          jsPanel={{ htmlbase, cssbase, jsbase }}
          eventHandler={{ handleInputChangeHTML, handleInputChangeCSS, handleInputChangeJS }}
          preview={{ html, css, code, err }}
        />
        :
        <RustPanel
          onLayout={onLayout}
          defaultLayout={defaultLayout}
          rustPanel={{ rustbase }}
          eventHandler={{ handleInputChangeHTML, handleInputChangeCSS, handleInputChangeJS }}
          preview={{ html, css, code, err }}
        />
      }

    </Box>

  );
}

type RustProps = {
  rustBase: string
}

interface RustPanel {
  onLayout,
  defaultLayout,
  rustPanel: RustProps,
  eventHandler,
  preview

}
const RustPanel: React.FC<RustPanel> = ({ onLayout, defaultLayout, rustPanel, eventHandler, preview }) => {
  return (
    <>
      <PanelGroup direction="vertical" onLayout={onLayout}>

        <Panel
          className="bg-slate-100 rounded-lg flex items-center justify-center text-center p-1"
          defaultSize={defaultLayout[0]}
          minSize={20}
        >
          {/* <EditorBox language="html" editorValue={codeBase} onChange={handleInputChangeHTML} /> */}
          <EditorBox
            language="html"
            editorValue={rustPanel?.rustBase}
            onChange={(value) => eventHandler.handleInputChangeHTML(value)}
          />
        </Panel>

        <PanelResizeHandle className="mx-1 h-2 bg-slate-300" />

        <Panel className="bg-slate-100 rounded-lg flex items-center justify-center text-center p-1"
          defaultSize={defaultLayout[1]}
          minSize={20}>
          <Preview htmlbase={preview.html} cssbase={preview.css} code={preview.code} err={preview.err} />
        </Panel>
      </PanelGroup>
    </>
  )
}

type JSProps = {
  htmlbase: string,
  cssbase: string,
  jsbase: string
}

interface JSPanelProps {
  onLayout,
  defaultLayout,
  jsPanel: JSProps,
  eventHandler,
  preview
}
const JSPanel: React.FC<JSPanelProps> = ({ onLayout, defaultLayout, jsPanel, eventHandler, preview }) => {
  return (
    <PanelGroup direction="vertical" onLayout={onLayout}>
      <Panel
        className="bg-slate-100 rounded-lg flex items-center justify-center text-center p-1"
      >
        <PanelGroup direction="horizontal" >
          <Panel
            className="bg-slate-100 rounded-lg flex items-center justify-center text-center p-1"
            defaultSize={defaultLayout[0]}
            minSize={20}
          >
            {/* <EditorBox language="html" editorValue={codeBase} onChange={handleInputChangeHTML} /> */}
            <EditorBox
              language="html"
              editorValue={jsPanel.htmlbase}
              onChange={(value) => eventHandler.handleInputChangeHTML(value)}
            />

          </Panel>
          <PanelResizeHandle className="mx-1 w-2 bg-slate-300" />

          <Panel
            className="bg-slate-100 rounded-lg flex items-center justify-center text-center p-1"
            defaultSize={defaultLayout[1]}
            minSize={20}
          >

            <EditorBox
              language="css"
              editorValue={jsPanel.cssbase}
              onChange={(value) => eventHandler.handleInputChangeCSS(value)}
            />

          </Panel>
          <PanelResizeHandle className="mx-1 w-2 bg-slate-300" />

          <Panel
            className="bg-slate-100 rounded-lg flex items-center justify-center text-center p-1"
            defaultSize={defaultLayout[1]}
            minSize={20}
          >


            <EditorBox
              language="javascript"
              editorValue={jsPanel.jsbase}
              onChange={(value) => eventHandler.handleInputChangeJS(value)}
            />

          </Panel>
        </PanelGroup>
      </Panel>
      <PanelResizeHandle className="mx-1 h-2 bg-slate-300" />

      <Panel className="bg-slate-100 rounded-lg flex items-center justify-center text-center p-1"
        defaultSize={defaultLayout[1]}
        minSize={20}>
        <Preview htmlbase={preview.html} cssbase={preview.css} code={preview.code} err={preview.err} />
      </Panel>
    </PanelGroup>
  )
}
export default PanelWrapperInner;