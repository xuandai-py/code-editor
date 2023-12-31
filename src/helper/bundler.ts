import * as esbuild from 'esbuild-wasm'
import { unpkgPlugin } from './unpkg'
import { fetchPlugin } from './fetch-plugin'

let service: esbuild.Service

export default async (rawCode: string) => {
    if (!service) {
        service = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        })
    }

    try {
        const result = await service.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPlugin(), fetchPlugin(rawCode)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            },
        });

        return {
            code: result.outputFiles[0].text,
            err: ''
        }
    } catch (error) {
        return {
            code: '',
            err: error.message
        }
    }

}