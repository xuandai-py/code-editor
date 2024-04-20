// app/providers.tsx
'use client'
import { store } from '@/redux/store.ts'
import { store as persist_store } from '@/redux/store/index'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'


persistStore(persist_store); // new store only
export default function Providers({
    children
}: {
    children: React.ReactNode
}) {
    return (
        // involve two separate store: store and persist_store


        <Provider store={ persist_store}>

            {/* <CacheProvider>
        <ChakraProvider> */}
            {children}
            {/* </ChakraProvider>
      </CacheProvider> */}
        </Provider>
    )
}