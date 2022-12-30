import React, { Suspense } from "react";

import { Dialog, majorScale } from "evergreen-ui";
import { Loading, Image } from "shared/ui";

import "./editor.scss";

const Editor = React.lazy(() => import("./Editor"));

type ImageEditorProps = {
    isShown: boolean;
    closeEditor: () => void;
    image: Image;
};
export const ImageEditor: React.FC<ImageEditorProps> = ({
    isShown,
    image,
    closeEditor,
}) => {
    return (
        <Suspense fallback={Loading}>
            <Dialog
                isShown={isShown}
                hasHeader={false}
                hasFooter={false}
                width="100vw"
                minHeightContent="100vh"
                topOffset={5}
                preventBodyScrolling
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEscapePress={false}
                contentContainerProps={{
                    padding: 0,
                    paddingRight: majorScale(6),
                    height: "100%",
                    minHeight: "100%",
                }}
            >
                <Editor onCloseEditor={closeEditor} src={image.url} />
            </Dialog>
        </Suspense>
    );
};
