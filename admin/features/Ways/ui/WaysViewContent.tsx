import React from "react";
import { Pane } from "evergreen-ui";
import { Content, ContentHeader, CreateLink } from "shared/ui";

import { useFetchWays } from "../hooks/useFetchWays";
import { WaysTable } from "./WaysTable";
import { useDeleteWay } from "../hooks/useDeleteWay";

export const WaysViewContent: React.FC = () => {
    const { ways, isFetching, refetch } = useFetchWays();
    const deleteMutation = useDeleteWay(refetch);

    return (
        <Content
            header={
                <ContentHeader
                    title="Routes Page"
                    hint="On this page you can see all information about ways in the form of a simple table"
                    actions={
                        <Pane>
                            <CreateLink text="Create route" to="create" />
                        </Pane>
                    }
                />
            }
        >
            <WaysTable
                ways={ways}
                isFetching={isFetching}
                onDelete={(id: number) => deleteMutation.mutate(id)}
            />
        </Content>
    );
};
