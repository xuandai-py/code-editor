"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import EditorBox from "./code_editor_replace";
import { useState } from "react";
import { htmlbase, cssbase, jsbase, rustbase, tsbase } from '@/helper/files'
import Preview from "./preview";
import bundler from "@/helper/bundler";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { setScript } from "@/redux/editor_slice";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useMediaQuery, useTheme } from "@mui/material";


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

type TSProps = {
  tsBase: string
}
interface TSPanel {
  onLayout,
  defaultLayout,
  tsPanel: TSProps,
  eventHandler,
  preview

}
const TSPanel: React.FC<TSPanel> = ({ onLayout, defaultLayout, tsPanel, eventHandler, preview }) => {
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
            language="typescript"
            editorValue={tsPanel.tsBase}
            onChange={(e) => eventHandler.handleInputChangeTS(e)}
          />
        </Panel>

        {/* <PanelResizeHandle className="mx-1 h-2 bg-slate-300" />

        <Panel className="bg-slate-100 rounded-lg flex items-center justify-center text-center p-1"
          defaultSize={defaultLayout[1]}
          minSize={20}>
          <Preview htmlbase={preview.html} cssbase={preview.css} code={preview.code} err={preview.err} />
        </Panel> */}
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ height: '100%' }}
      {...other}
    >
      {value === index && (
        <Box sx={{ height: '100%', p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const JSPanel: React.FC<JSPanelProps> = ({ onLayout, defaultLayout, jsPanel, eventHandler, preview }) => {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <PanelGroup direction="vertical" onLayout={onLayout}>
      <Panel
        className="bg-slate-100 rounded-lg flex items-center justify-center text-center p-1"
      >
        {isMobile ? (
          <>
            <Box sx={{ width: '100%', height: '100%', }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                // centered
                >
                  <Tab label="html" />
                  <Tab label="css" />
                  <Tab label="javascript" />

                </Tabs>
              </Box>
              <TabPanel value={activeTab} index={0}>
                <EditorBox
                  language="html"
                  editorValue={jsPanel.htmlbase}
                  onChange={(value) => eventHandler.handleInputChangeHTML(value)}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <EditorBox
                  language="css"
                  editorValue={jsPanel.cssbase}
                  onChange={(value) => eventHandler.handleInputChangeCSS(value)}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={2}>
                <EditorBox
                  language="javascript"
                  editorValue={jsPanel.jsbase}
                  onChange={(value) => eventHandler.handleInputChangeJS(value)}
                />
              </TabPanel>
            </Box>
          </>
        ) : (
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
            <PanelResizeHandle className="mx-1  w-2 bg-slate-300 " />

            <Panel
              className="bg-slate-100 rounded-lg flex items-center justify-center text-center p-1"
              defaultSize={defaultLayout[2]}
              minSize={20}
            >


              <EditorBox
                language="javascript"
                editorValue={jsPanel.jsbase}
                onChange={(value) => eventHandler.handleInputChangeJS(value)}
              />

            </Panel>
          </PanelGroup>

        )
        }


      </Panel >
      <PanelResizeHandle className="mx-1 my-2 h-2 bg-slate-300" />

      <Panel className="bg-slate-100 rounded-lg p-1"
        defaultSize={defaultLayout[3]}
        minSize={20}
        style={{ overflowY: 'scroll' }}
      >
        <Preview htmlbase={preview.html} cssbase={preview.css} code={preview.code} err={preview.err} />
      </Panel>
    </PanelGroup >
  )
}

const paneltype = {
  js: JSPanel,
  rust: RustPanel,
  ts: TSPanel
}

type PanelTypesProp = 'js' | 'rust' | 'ts';

interface EditorBoxProps {
  defaultLayout: number[];
  type: PanelTypesProp
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
  const [ts, setTs] = useState(tsbase)
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
    console.log('html: ', input);
    dispatch(setScript(input))
  }

  const handleInputChangeTS = (input: string) => {
    console.log('e: ', input);
    let re;
    console.log('transpiled: ', re);

    setTs(input)
  }

  return (
    <Box sx={{ height: `${frameHeight}px` }} >
      {(() => {
        switch (type) {
          case 'js':
            return <JSPanel
              onLayout={onLayout}
              defaultLayout={defaultLayout}
              jsPanel={{ htmlbase, cssbase, jsbase }}
              eventHandler={{ handleInputChangeHTML, handleInputChangeCSS, handleInputChangeJS }}
              preview={{ html, css, code, err }}
            />
          case 'ts':
            return <TSPanel
              onLayout={onLayout}
              defaultLayout={defaultLayout}
              tsPanel={{ tsbase }}
              eventHandler={{ handleInputChangeHTML, handleInputChangeCSS, handleInputChangeJS }}
              preview={{ html, css, code, err }}
            />
          case 'rust':
            return <RustPanel
              onLayout={onLayout}
              defaultLayout={defaultLayout}
              rustPanel={{ rustbase }}
              eventHandler={{ handleInputChangeHTML, handleInputChangeCSS, handleInputChangeJS }}
              preview={{ html, css, code, err }}
            />
          default:
            return null
        }
      })()}
      {/* {type === 'js'
        ?
        <JSPanel
          onLayout={onLayout}
          defaultLayout={defaultLayout}
          jsPanel={{ htmlbase, cssbase, jsbase }}
          eventHandler={{ handleInputChangeHTML, handleInputChangeCSS, handleInputChangeJS }}
          preview={{ html, css, code, err }}
        />
        : type === 'rust' ?
          // extend by swc
          <RustPanel
            onLayout={onLayout}
            defaultLayout={defaultLayout}
            rustPanel={{ rustbase }}
            eventHandler={{ handleInputChangeHTML, handleInputChangeCSS, handleInputChangeJS }}
            preview={{ html, css, code, err }}
          />

          : <TSPanel
            onLayout={onLayout}
            defaultLayout={defaultLayout}
            tsPanel={{ tsbase }}
            eventHandler={{ handleInputChangeTS }}
            preview={{ html, css, code, err }}
          />
      } */}

    </Box>

  );
}

export default PanelWrapperInner;

/**
 * import FreeView from ...
 * import PremiumView from ...
 * import Proview from ...
 * 
 * const views = {
 *  premium: PremiumView,
 * pro: Proview,
 * free: FreeView
 * };
 * 
 * interface DemoProps {
   user: {
    plan: 'premium' | 'pro' | 'free';
   };
 }

 export default function Demo({user}: DemoProps) {
   costn currentView = views[user.plan];
   return <currentView />
 }
 */