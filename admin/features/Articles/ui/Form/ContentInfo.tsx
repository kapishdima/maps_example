import { Pane } from "evergreen-ui";
import React, { useState } from "react";
import { ArrayInput, TabPane } from "shared/ui";
import { ContentSelect, ContentType, contentTypes } from "../ContentSelect";

export const ContentInfo: React.FC = () => {
    const [contentType, setContentType] = useState<ContentType>(null);

    const onContentTypeSelect = (contentType) => {
        setContentType(contentType);
    };

    const addContentType = (append: (value: any) => void) => {
        if (!contentType?.label) {
            return;
        }
        append({ type: contentType?.label });
    };

    return (
        <TabPane index={1} tab="Content">
            <ContentSelect
                label="Content types"
                onSelect={onContentTypeSelect}
            />
            <ArrayInput
                name="content"
                title="Content"
                defaultValue={null}
                onAddButtonClick={addContentType}
            >
                {(field, index) => (
                    <Pane>
                        {contentTypes
                            .find((type) => field.type === type.label)
                            ?.value(`content.${index}`)}
                    </Pane>
                )}
            </ArrayInput>
        </TabPane>
    );
};
