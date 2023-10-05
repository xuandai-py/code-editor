import * as esbuild_wasm from 'esbuild-wasm'
import * as esbuild from 'esbuild'

import { unpkgPlugin } from './unpkg'
import { fetchPlugin } from './fetch-plugin'

let service: esbuild_wasm.Service

export default async (rawCode: string) => {
    if (!service) {
        service = await esbuild_wasm.startService({
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

const EsNativeBundler = async () => {
    try {
        const result = await esbuild.build({
            entryPoints: ['app.jsx'],
            bundle: true,
            minify: true,
            sourcemap: true,
            //   target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
            //   outfile: 'out.js',
        })
    } catch (e) {

    }
}