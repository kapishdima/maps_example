import React from "react";

import { majorScale, Pane, Button } from "evergreen-ui";
import { Pagination, PaginationSizeSelect } from "shared/ui";

type GalleryFooterProps = {
    totalPages: number;
    onSelectComplete: () => void;
};

export const GalleryFooter: React.FC<GalleryFooterProps> = ({
    onSelectComplete,
    totalPages,
}) => {
    return (
        <Pane>
            <Pane
                display="flex"
                alignContent="center"
                justifyContent="space-between"
                marginTop={majorScale(3)}
                paddingBottom={majorScale(4)}
            >
                <Pane display="flex">
                    <Pagination totalPages={totalPages} />
                    <PaginationSizeSelect options={["10", "20", "30"]} />

                    <Button
                        appearance="primary"
                        onClick={onSelectComplete}
                        marginLeft={majorScale(4)}
                    >
                        Ok
                    </Button>
                </Pane>
            </Pane>
        </Pane>
    );
};
