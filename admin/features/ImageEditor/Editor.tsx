import React, { useState, useEffect } from "react";

import ToastImageEditor from "@toast-ui/react-image-editor";

import { EditorActions } from "./EditorActions";
import { editorTheme } from "./theme";

import "tui-image-editor/dist/tui-image-editor.css";

type EditorProps = {
    src: string;
    onCloseEditor: () => void;
};

const Editor: React.FC<EditorProps> = ({ src, onCloseEditor }) => {
    if (!src) {
        return null;
    }

    const editorRef = React.useRef();
    const [editorInstance, setEditorInstance] = useState(null);

    useEffect(() => {
        if (!editorRef?.current) {
            return;
        }

        const instance = (editorRef.current as any).getInstance();
        setEditorInstance(instance);
    }, [editorRef?.current]);

    return (
        <>
            <ToastImageEditor
                ref={editorRef}
                includeUI={{
                    loadImage: {
                        path: src,
                        name: "SampleImage",
                    },
                    theme: editorTheme,
                    menu: [
                        "crop",
                        "flip",
                        "rotate",
                        "resize",
                        "shape",
                        "filter",
                    ],
                    initMenu: "filter",
                    uiSize: {
                        width: "98vw",
                        height: "700px",
                    },
                    menuBarPosition: "bottom",
                    locale: { Load: "\u200c" },
                }}
                cssMaxHeight={500}
                cssMaxWidth={700}
                selectionStyle={{
                    cornerSize: 20,
                    rotatingPointOffset: 70,
                }}
                usageStatistics={true}
            />

            <EditorActions
                editor={editorInstance}
                onSaveComplete={onCloseEditor}
            />
        </>
    );
};

export default Editor;
