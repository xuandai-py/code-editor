import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localforage from 'localforage'

const fileCache = localforage.createInstance({
    name: 'filecache'
}) as LocalForage

// (async () => {
//     await fileCache.setItem('color', 'red')
//     const color = await fileCache.getItem('color')
//     console.log(color);

// })()

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /(^index\.js$)/ }, () => {
                return {
                    loader: 'jsx',
                    contents: inputCode
                }
            })

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path)
                if (cachedResult) return cachedResult
                /**
                 *  if (args.path.endsWith('.ts') || args.path.endsWith('.tsx')) {
                    const { data, request } = await axios.get(args.path);

                    const transformedCode = await esbuild.transform(data, {
                        loader: 'ts',
                        target: 'es2015',
                    });

                    const result: esbuild.OnLoadResult = {
                        loader: 'jsx',
                        contents: transformedCode.code,
                        resolveDir: new URL('./', request.responseURL).pathname,
                    }

                    await fileCache.setItem(args.path, result)
                    return result;
                }

                 */
            })

            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path)
                if (cachedResult) return cachedResult
                const { data, request } = await axios.get(args.path);

                const escaped = data
                    .replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'")

                const contents = `
                    const style = document.createElement('style');
                    style.innerText = '${escaped}';
                    document.head.appendChild(style)
                `

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL('./', request.responseURL).pathname,
                }

                await fileCache.setItem(args.path, result)
                return result
            })

            build.onLoad({ filter: /.*/ }, async (args: any) => {

                const { data, request } = await axios.get(args.path);

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname,
                }

                await fileCache.setItem(args.path, result)
                return result

            })

        }
    }
}
// build.onLoad({ filter: /\.(js|jsx)$/ }, async (args: any) => {
//     const { data, request } = await axios.get(args.path);

//     const result: esbuild.OnLoadResult = {
//       loader: 'jsx',
//       contents: data,
//       resolveDir: new URL('./', request.responseURL).pathname,
//     };

//     await fileCache.setItem(args.path, result);
//     return result;
//   });