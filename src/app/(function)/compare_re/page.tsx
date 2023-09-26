import { Container, CssBaseline, Divider, Stack, Typography } from '@mui/material'
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
        <Stack direction="row" my={1} spacing={2} alignItems="center">
          <Typography variant="h4" gutterBottom>
            Differcences checker
          </Typography>
          <Divider orientation="vertical" sx={{ height: 24, width: 2, color: 'gray' }} />
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
