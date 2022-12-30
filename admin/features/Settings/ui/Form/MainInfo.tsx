import React from "react";
import { majorScale, Pane } from "evergreen-ui";
import {
    MediaInputMany,
    TabPane,
    TranslatableTextEditorInput,
} from "shared/ui";

export const MainInfo: React.FC = () => {
    return (
        <TabPane index={0} tab="Main Information">
            <Pane width="70%" marginTop={majorScale(4)}>
                <TranslatableTextEditorInput
                    name="main_block1_text1"
                    label="Main block 1 text 1"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_block1_text2"
                    label="Main block 1 text 2"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_exp_title"
                    label="Main `experience` title"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_exp_text1"
                    label="Main `experience` text 1"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_exp_text2"
                    label="Main `experience` text 2"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_expertise_title"
                    label="Main expertise title"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_expertise_text"
                    label="Main expertise text"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_black_title"
                    label="Main black sea title"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_black_point1_title"
                    label="Main black sea point 1 title"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_black_point1_text"
                    label="Main black sea point 1 text"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_black_point2_title"
                    label="Main black sea point 2 title"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_black_point2_text"
                    label="Main black sea point 2 text"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_black_point3_title"
                    label="Main black sea point 3 title"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_black_point3_text"
                    label="Main black sea point 3 text"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_black_button_text"
                    label="Main black sea button text"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_partner_title"
                    label="Main partner title"
                    isInline={true}
                />
                <TranslatableTextEditorInput
                    name="main_partner_text"
                    label="Main partner text"
                    isInline={true}
                />
            </Pane>
            <MediaInputMany name="media" />
        </TabPane>
    );
};
