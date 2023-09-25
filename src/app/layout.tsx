import Navbar from '@/components/header/nav_bar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/footer'
import Providers from './util/provider'
import { store } from '@/redux/store.ts'
import ThemeRegistry from '@/components/theme_registry/ThemeRegistry'
import { Box } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <Providers >
            {/* <Navbar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                m: 1,
              }}
            >
              {children}
            </Box> */}
            {children}
            <Footer />
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  )
}
