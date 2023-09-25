import { OnMount } from '@monaco-editor/react'

const activateMonacoJSXHighlighter: OnMount = async (monacoEditor, monaco) => {
    const { default: traverse } = await import('@babel/traverse')
    const { parse } = await import('@babel/parser')
    const { default: MonacoJSXHighlighter } = await import(
      'monaco-jsx-highlighter'
    )
  
    const monacoJSXHighlighter = new MonacoJSXHighlighter(
      monaco,
      parse,
      traverse,
      monacoEditor
    )
  
    monacoJSXHighlighter.highlightOnDidChangeModelContent(
      // () => {},
      // () => {},
      // undefined,
      // () => {}
    )
    monacoJSXHighlighter.addJSXCommentCommand()
  
    return {
      monacoJSXHighlighter,
    }
  }
  
  export default activateMonacoJSXHighlighter