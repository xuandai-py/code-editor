import * as esbuild from 'esbuild-wasm'


// help to inspect and extract file/folder found in package 
export const unpkgPlugin = () => {
    return {
        name: 'unpkg-plugin',
        setup(build: esbuild.PluginBuild) {
            // handle entry file
            build.onResolve({ filter: /(^index\.js$)/ }, () => {
                return { path: 'index.js', namespace: 'a' }
            })

            // handle relative paths in module
            build.onResolve({ filter: /^\.+\// }, (args: any) => {
                return {
                    namespace: 'a',
                    path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
                }
            })

            // handle main file of module
            build.onResolve({ filter: /.*/ }, async (args: any) => {

                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`
                }
            })
        }
    }
}