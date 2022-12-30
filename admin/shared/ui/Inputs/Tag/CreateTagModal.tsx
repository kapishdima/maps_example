import React, { memo } from "react";

import { useMutation } from "react-query";
import { Button, Dialog, majorScale, Pane } from "evergreen-ui";

import { CountriesSelect, Form, TextInput } from "shared/ui";
import { Tag } from "./TagInput";
import { useTagsService } from "processes/tags";
import { TagRequestEntity } from "entities/tag";
import { TagDomainEntity } from "entities/tag/tag-domain.entity";

type CreateTagModalProps = {
    isShown: boolean;
    onComplete: (tag: Tag) => void;
    defaultTagName?: string;
};

export const CreateTagModal: React.FC<CreateTagModalProps> = ({
    isShown,
    onComplete,
    defaultTagName,
}) => {
    const tagsService = useTagsService();
    const { mutateAsync: createTag, isLoading } = useMutation<
        TagDomainEntity,
        any,
        TagRequestEntity
    >(async (tag: TagRequestEntity) => await tagsService.createTag(tag));

    const onSubmit = async (tag: TagRequestEntity) => {
        const createdTag = await createTag(tag);
        onComplete({
            value: createdTag.getId().toString(),
            label: createdTag.getName(),
        });
    };

    return (
        <Dialog
            isShown={isShown}
            title="Create tag"
            hasFooter={false}
            contentContainerProps={{ style: { paddingBottom: majorScale(4) } }}
        >
            <Form
                id="create-tag-form"
                key="create-tag-form"
                onSubmit={onSubmit}
                defaultValues={{ name: defaultTagName || "" }}
            >
                <TextInput
                    name="name"
                    label="Tag name"
                    placeholder="Enter tag name.."
                />
                <TextInput
                    name="translation"
                    label="Tag translation"
                    placeholder="Enter tag translation..."
                />

                <CountriesSelect />

                <Button
                    type="submit"
                    appearance="primary"
                    isLoading={isLoading}
                >
                    Create
                </Button>
            </Form>
        </Dialog>
    );
};
