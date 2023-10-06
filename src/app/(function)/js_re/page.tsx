
import PanelWrapperInner from "@/components/body/panel_wrapper_inner";
import { cookies } from "next/headers";
import './page.css'
import { Container, CssBaseline } from "@mui/material";

const PanelWrapper = () => {
  const layout = cookies().get("react-resizable-panels:layout");

  let defaultLayout = [30, 40, 30, 100];
  if (layout) {
    defaultLayout = JSON.parse(layout.value);
  }

  return (
    <>
      <PanelWrapperInner
        defaultLayout={defaultLayout}
        type="js"
      // codeBase={codeBase}
      // onChangeHTML={value}
      />
    </>
  );
}

const page = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ p: 0 }} >
        <PanelWrapper />
      </Container >
    </>
  );
};

export default page