import Button from "@mui/material/Button";
// @ts-ignore
import prettier from 'prettier';
// @ts-ignore
import parserBabel from 'prettier/parser-babel';
// @ts-ignore
import parserHtml from 'prettier/parser-html';
// @ts-ignore
import parserPostcss from 'prettier/parser-postcss';
import { CommonButtons } from "./button";
import { useAppSelector } from "@/redux/store/index";


// onchange, format
const FormatSnippet = () => {
    // const editorRefs = editorRef;
    // const { editorRefObject: editorRefs } = useAppSelector((state) => state.editor);
    const { editorRef: editorRefs } = useAppSelector((state) => state.editor);

    const onFormatClick = async () => {
        try {
            const formattedEditors = await Promise.all(editorRefs.map(async (editorRef) => {
                console.log(editorRef)
                const unformatted = editorRef.editor.getModel().getValue();
                // editorRef.editor.getModel.getValue

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
                // editorRef.setValue(formattedEditors[index]);
                editorRef.editor.setValue(formattedEditors[index]);
            });
        } catch (error) {
            //! handle error
            console.error("An error occurred:", error)
            console.error("Error details: " + error.message)
        }


        // new
        // try {
        //     const formattedEditors = await Promise.all(
        //         Object.entries(editorRefObjects).map(async ([key, editorRef]) => {
        //             //   })     
        //             //    Obje/ct.values(editorRefObjects).map(async (editorRef) => {
        //             console.log(editorRef)
        //             let unformatted;
        //             if (editorRef != null && typeof editorRef === 'object') {
        //                 unformatted = editorRef?.editor?.getModel().getValue();
        //                 console.log(editorRef?.editor?.getModel().getValue())
        //             }

        //             let parser;
        //             if (key === 'javascript') {
        //                 parser = 'babel';
        //             } else if (key === 'css') {
        //                 parser = 'css';
        //             } else if (key === 'html') {
        //                 parser = 'html';
        //             }
        //             console.log('passed')
        //             const formatted = await prettier.format(unformatted, {
        //                 parser: parser,
        //                 useTabs: false,
        //                 plugins: [parserBabel, parserHtml, parserPostcss],
        //                 semi: true,
        //                 singleQuote: true,
        //                 jsxBracketSameLine: true,
        //             });

        //             console.log("formatted: ", formatted)
        //             return formatted;
        //         })

        //     );
        //     console.log('passed-2')

        //     Object.keys(editorRefObjects).forEach((language, index) => {
        //         editorRefObjects[language]?.editor?.setValue(formattedEditors[index]);
        //     });
        // } catch (error) {
        //     console.error('An error occurred:', error);
        //     console.error('Error details:', error.message);
        // }
    }
    return (
        <CommonButtons onClickEvent={onFormatClick}        >
            Format
        </CommonButtons>
    )
}

export default FormatSnippet;