// this page contain all features-components for JS bundle - console - result
// `app/page.tsx` is the UI for the `/` URL

import PanelWrapperInner from "@/components/body/panel_wrapper_inner";
import { cookies } from "next/headers";
import './page.css'

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

const PanelWrapper = () => {
  const layout = cookies().get("react-resizable-panels:layout");

  let defaultLayout =  [33, 67];
  if (layout) {
    defaultLayout = JSON.parse(layout.value);
  }

  return (
    <>
      <PanelWrapperInner defaultLayout={defaultLayout} type="rust"/>
    </>
  );
}



const page = () => {
  return (

    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <PanelWrapper />
      </Container>
    </>
  );
};

export default page