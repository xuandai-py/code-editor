import React from 'react'
import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const Footer = () => {
    return (
        <Paper sx={{marginTop: 'calc(5% + 60px)',
        width: '100%',
        bottom: 0,
        }} component="footer" square variant="outlined">
          <Container maxWidth="lg">
            {/* <Box
              sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: "flex",
                my:1
              }}
            >
                <div>
                <Image priority src="/Logo.svg" width={75} height={30} alt="Logo" />
                </div>
            </Box>
     */}
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