import React from 'react'
import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const Footer = () => {
  return (
    <Paper sx={{
      marginTop: 'calc(5% + 60px)',
      width: '100%',
      bottom: 0,
    }} component="footer" square variant="outlined">
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my: 1
          }}
        >
          <div>
            <Link href="https://www.daidesu.dev/">
              <Image priority src="https://res.cloudinary.com/dxhl09emw/image/upload/v1677746843/radio/Frame_16_kqw1wj.svg" width={32} height={32} alt="Logo" />
            </Link>
          </div>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            m: 1,
          }}
        >
          <Typography variant="caption" color="initial">
            Made with Next - MUI - Monaco editor and more
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}

export default Footer;