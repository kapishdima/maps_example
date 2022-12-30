import React from "react";

import { useQuery } from "react-query";

type UseInitialDataOptions = {
    handler: (props: any) => any;
    name: string;
};

export const useInitialData = ({ name, handler }: UseInitialDataOptions) => {
    const query = useQuery(name, handler);

    return query;
};
