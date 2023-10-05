import { useEffect, useRef, useState } from "react";
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Badge, Chip } from "@mui/material";

// import './preview.css';

interface PreviewProps {
  code: string
  err: string
  htmlbase: string
  cssbase: string
}

// better replace eval with Function()
// eval(event.data) 
{/* <body>
      <div id="root"></div>
      <script>
        const handleError = (error) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h1>Error</h1>' + error + '</div>';
          root.innerHTML = '<div style="color: red;"><h1>Error</h1>' + error + '</div>';
          console.error(error); 
        };
        window.addEventListener('message', (event) => {
          try {
              const fn = new Function(event.data);
              fn()
            } catch (error) {
              handleError(error)  
          }
        }, false);
      </script>
      </body> */}


interface TabPanelProps {
  children?: React.ReactNode;
  // dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Preview: React.FC<PreviewProps> = ({ code, err, htmlbase, cssbase }) => {

  // console.log(code, err);
  // passing event.data (code) to iframe
  const html = `
  <html>
  <head>
  <meta charset="UTF-8">
  <title>Basic Body and Div with CSS Styling</title>
  <style>
    ${cssbase}
  </style>
</head>
    <body>
        <div id="root"> ${htmlbase}</div>
        
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            const innerResultConsoler = document.querySelector('#result');
              root.innerHTML = '<div style="color: red;"> <h4>Runtime Error: </h4>' + err + '</div> <h5>/n Check the browser console for more infor</h5>';
              innerResultConsoler.innerHTML = '<div style="color: red;"> <h4>Runtime Error: </h4>' + err + '</div> <h5>/n Check the browser console for more infor</h5>';
              console.error(err);
          }

          window.addEventListener('error', (event) => {
              event.preventDefault()
              handleError(event.error)
          })
          window.addEventListener('message', (event) => {
            try{
              const fn = new Function(event.data);
              fn()
            } catch (err){
              handleError(err)
            }
          }, false);
        </script>
      </body>
    
  </html>
`

  const iframe = useRef<any>()
  const consoleContainerRef = useRef(null);
  const [noticeInvisible, setNoticeInvisible] = useState(false);


  useEffect(() => {
    if (iframe.current) {
      iframe.current.srcdoc = html;
      setTimeout(() => {
        iframe.current.contentWindow.postMessage(code, '*');
      }, 50);
    }
  }, [code])

  // const [consoleText, setConsoleText] = useState([]);

  // useEffect(() => {
  //   const consoleMethods = ['log', 'error', 'warn', 'info'];

  //   consoleMethods.forEach(method => {
  //     const oldMethod = console[method];
  //     console[method] = function (...args) {
  //       oldMethod.apply(console, args);
  //       const message = args.map(arg => (typeof arg === 'object' ? JSON.parse(JSON.stringify(arg)) : arg));
  //       setConsoleText(prevText => [...prevText, { method, message }]);
  //     };
  //   });
  // }, []);


  // const formatConsoleMessage = (method, message) => {
  //   return `<div>${method.toUpperCase()}: ${message.join(' ')}</div>`;
  // };
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (

    <Box sx={{ width: '100%', }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value}  onChange={handleChange} aria-label="basic tabs example"        >
          <Tab label="Output" {...a11yProps(0)} />
          <Tab
            label={
              <>
                Console
                {err && <Chip label="!" sx={{border: '1px solid red', backgroundColor: '#fff', color: 'red'}}/>}
              </>
            } {...a11yProps(1)}
            sx={{ flexDirection: 'row', gap: 1 }}
          />

        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <iframe
          title='preview'
          style={{ color: '#000', minHeight: '200px', height: '450px', maxHeight: '800px', width: '100%' }}
          ref={iframe}
          sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
          srcDoc={html}

        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{ position: "relative", height: "100%", flexGrow: 1 }}>
          <div id="result" style={{ backgroundColor: 'white' }}>
            {err && <div className="preview-error" style={{ position: 'absolute', top: '10px', left: '10px', color: 'red' }}>Unexpected error... {err}</div>}
          </div>
        </div>
      </TabPanel>

    </Box>
  )
  // <div style={{ position: "relative", height: "100%", flexGrow: 1 }}>
  //<div id="result" style={{ backgroundColor: 'white' }}> 

  //   {/*  <div id="tabs">
  //         <ul>
  //           <li><a href="#result">Result</a></li>
  //           <li><a href="#console">Console</a></li>
  //         </ul>
  //         <div id="tab-content">
  //          <div id="console">
  //             <div
  //               id="console-container"
  //               style={{
  //                 minHeight: '200px',
  //                 height: '500px',
  //                 maxHeight: '800px',
  //                 width: '100%',
  //                 border: '1px solid #3182ce',
  //                 overflowY: 'scroll',
  //                 borderRadius: '5px',
  //               }}>

  //               {consoleText.length > 0 &&
  //                 consoleText.map((log, index) => (
  //                   <div
  //                     key={index}
  //                     dangerouslySetInnerHTML={{ __html: formatConsoleMessage(log.method, log.message) }}
  //                   ></div>
  //                 ))}
  //             </div>
  //           </div> 
  //         </div>
  //       </div>
  // */}
  // </div >
  // <PreviewTabs />
}


export default Preview