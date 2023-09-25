/// return detect {id, parser, plugin}

> get content through onMount()

> format > onCliclFormat() >   

interface formatProps {
    editor: Editor,
    parser: String,
    plugin: any
}

const format = (editor, parser, plugin)
try {
    const unformatted = editor.getModel().getValue()
    const formatted = await prettier.format(unformatted, {
        parser: parser,
        // depcrepted   
        plugins: [parserBabel, parserHtml, parserPostcss],
        useTabs: false,
        semi: true,
        singleQuote: true
    })
    // -> 'foo()\n'
    // const eslint = new ESLint({fix: true});
    // const formatted = await eslint.lintText(unformatted);
    //     const [{output}] = formatted;
    // editorRef.setValue(output)
    editorRef.setValue(formatted)
} catch (error) {
    console.error("An error occurred:", error)
    console.error("Error details: " + error.message)
}
}