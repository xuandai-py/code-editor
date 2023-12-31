import activateMonacoJSXHighlighter from "@/helper/monacoHighlighter";
import { setEditorRef } from "@/redux/editor_slice";
import { Editor, OnMount } from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { useCopyToClipboard } from "usehooks-ts";




interface BaseEditorProps {
    language: string;
    value: string;
    zoomLevel: number | undefined;
    onMount: OnMount;
    onChange?(value: string | undefined): void;
}

interface EditorBoxProps {
    language: string;
    editorValue: string;
    onChange(value: string | undefined): void;
}


const BaseEditor: React.FC<BaseEditorProps> = ({
    language,
    value,
    zoomLevel,
    onMount,
    onChange,
}) => {
    return (
        <Editor
            height="100%"
            width="100%"
            theme="vs-dark"
            defaultLanguage={language}
            value={value}
            options={{
                wordWrap: 'on',
                minimap: { enabled: false },
                folding: false,
                lineNumbersMinChars: 3,
                fontSize: zoomLevel,
                scrollBeyondLastLine: false,
                automaticLayout: true,
            }}
            onMount={onMount}
        // onChange={(value) => onChange(value)}
        />
    );
};


const EditorBox: React.FC<EditorBoxProps> = ({ language, editorValue, onChange }) => {
    // const { editorRef, zoomLevel } = useContext(RefEditorContext);
    const [value, copy] = useCopyToClipboard()
    const dispatch = useDispatch();

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // editorRef.current = editor
        dispatch(setEditorRef(editor))
console.log(editor.getValue())
        editor.onDidChangeModelContent(() => {
            onChange(editor.getValue())
            console.log(editor.getValue())
        });

        editor.getModel()?.updateOptions({ tabSize: 2 })
        activateMonacoJSXHighlighter(editor, monaco)
    }

    const zoomLevel = useSelector((state) => state.editor.zoomLevel);


    return (

        <>
            <BaseEditor
                language={language}
                value={editorValue}
                zoomLevel={zoomLevel}
                // zoomLevel={16}
                onMount={handleEditorDidMount}
            />
        </>
    )
}

// <Flex flex={1}>
// <ResizableBox direction='horizontal' >
// <div className="w-100 h-100 hide-overflow pos-relative">
{/* <button className="button is-success" onClick={() => copy(editorRef.getValue())}>
                <span className="icon is-small">
                    <i className="fas fa-check"></i>
                </span>
                <span>Save</span>
            </button> */}

// </div>
// </ResizableBox>
// </Flex>



export default EditorBox