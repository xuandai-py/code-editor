import Button from "@mui/material/Button";
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import parserHtml from 'prettier/parser-html';
import parserPostcss from 'prettier/parser-postcss';
import { CommonButtons } from "./button";



const FormatSnippet: React.FC<{}> = ({ refObject }) => {
    const editorRefs = refObject;
    const onFormatClick = async () => {
        try {
            const formattedEditors = await Promise.all(editorRefs.map(async (editorRef) => {
                const unformatted = editorRef.editor.getModel().getValue();

                let parser;
                if (editorRef.language === 'javascript') {
                    parser = 'babel';
                } else if (editorRef.language === 'css') {
                    parser = 'css';
                } else if (editorRef.language === 'html') {
                    parser = 'html';
                }
                const formatted = await prettier.format(unformatted, {
                    parser: parser,
                    // depcrepted   
                    plugins: [parserBabel, parserHtml, parserPostcss],
                    useTabs: false,
                    semi: true,
                    singleQuote: true,
                    jsxBracketSameLine: true
                });
                return formatted;
            }));

            editorRefs.forEach((editorRef, index) => {
                editorRef.editor.setValue(formattedEditors[index]);
            });
        } catch (error) {
            //! handle error
            console.error("An error occurred:", error)
            console.error("Error details: " + error.message)
        }
    }
    return (
        <CommonButtons onClickEvent={onFormatClick}        >
            Format
        </CommonButtons>
    )
}

export default FormatSnippet;