//  ui that shared across multiple routes.
// this contains: JS navigation, 3 code editor, result, console

import Navbar from "@/components/header/nav_bar"
import { Box } from "@mui/material"

// navigation: shared layout + bundle button  
export default function JSLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar showBundle={true} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          m: 1,
        }}
      >
        {children}
      </Box>
    </>
  )
}