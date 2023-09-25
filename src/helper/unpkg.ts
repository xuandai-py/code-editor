import * as esbuild from 'esbuild-wasm'



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

                // else if (args.path === 'tiny-test-pkg') {
                //     return {
                //         path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js', 
                //         namespace: 'a'
                //     }
                // }
            })
        }
    }
}