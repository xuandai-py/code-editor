'use client'
import React, { useRef, useState } from 'react';

import { DiffEditor } from '@monaco-editor/react';

const DiffEditorWrapper = () => {
    const [original, setOriginal] = useState('// the original code');
    const [modified, setModified] = useState('// the modified code');

    const options = {
        readOnly: false, // Enable read-write capabilities in both panels
        domReadOnly: false,
        renderSideBySide: true,
        originalEditable: true,
        automaticLayout: true,
        folding: false,
        lineNumbersMinChars: 3,
        minimap: { enabled: false },
        renderOverviewRuler: false
    };
    return (
        <>
            <DiffEditor
                height="80vh"
                language="javascript"
                original={original}
                modified={modified}
                theme="vs-dark"
                options={options}
            />
        </>
    );
}

export default DiffEditorWrapper