// app/providers.tsx
'use client'
import { store } from '@/redux/store.ts'
import { Provider } from 'react-redux'

export default function Providers({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <Provider store={store}>

            {/* <CacheProvider>
        <ChakraProvider> */}
            {children}
            {/* </ChakraProvider>
      </CacheProvider> */}
        </Provider>
    )
}