import initSwc, { transformSync } from "@swc/wasm-web";

export default function SwcBundle(code: string, language: LangSyntax | "typescript" = "typescript") {

    const options: any = {
        jsc: {
            parser: {

            },
        },
    };

    if (language === 'typescript') {
        options.jsc.parser = TSParser;
    } else {
        options.jsc.parser = ESParser;
    }

    return transformSync(code, options);
}

const TSParser = {
    "syntax": "typescript",
    "tsx": true,
    "decorators": false,
    "dynamicImport": false
}

const ESParser = {
    "syntax": "ecmascript",
    "jsx": true,
    "dynamicImport": false,
    "privateMethod": false,
    "functionBind": false,
    "classPrivateProperty": false,
    "exportDefaultFrom": false,
    "exportNamespaceFrom": false,
    "decorators": false,
    "decoratorsBeforeExport": false,
    "importMeta": false
}
