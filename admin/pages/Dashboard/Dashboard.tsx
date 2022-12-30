import React from "react";

import { Button, Heading, majorScale, Pane } from "evergreen-ui";
import { Slider, Card, Content, ContentHeader } from "shared/ui";
import { UnmoderatedCard } from "features";

export const Dashboard: React.FC = () => {
    return (
        <Content
            header={
                <ContentHeader
                    title="Unmoderated resources"
                    hint="This section displays which entries you need to confirm. Click on the 'View' button on the card to start moderation"
                />
            }
        >
            <Slider
                slidesPerView={6}
                slidesPerGroup={1}
                spaceBetween={majorScale(2)}
            >
                <UnmoderatedCard title="Winers" count={113} />
                <UnmoderatedCard title="Winers" count={113} />
                <UnmoderatedCard title="Winers" count={113} />
                <UnmoderatedCard title="Winers" count={113} />
                <UnmoderatedCard title="Winers" count={113} />
                <UnmoderatedCard title="Winers" count={113} />
                <UnmoderatedCard title="Winers" count={113} />
                <UnmoderatedCard title="Winers" count={113} />
            </Slider>
        </Content>
    );
};
