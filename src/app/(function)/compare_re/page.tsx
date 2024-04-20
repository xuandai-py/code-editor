import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DiffEditorWrapper from '@/components/body/diff_editor';

const page = () => {

  const options = {
    readOnly: false, // Enable read-write capabilities in both panels
    domReadOnly: false,
    renderSideBySide: true,
    originalEditable: true,
    automaticLayout: true,
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Stack direction={{ xs: 'column', sm: 'row' }} my={1} spacing={2} alignItems="center">
          <Typography sx={{ fontSize: {  sm: 'larger', md: 'xx-large' } }} gutterBottom>
            Differcences checker
          </Typography>
          <Divider
            orientation="vertical"
            sx={{ height: 24, width: 2, color: 'gray', display: { xs: 'none', sm: 'inline-flex' } }} />
          <Typography variant="subtitle1" gutterBottom>
            Compare text to find the difference between two text files
          </Typography>
        </Stack>

        <DiffEditorWrapper />
      </Container>
    </>
  )
}

export default page
