export type Filter = {
    name: string;
    Component: JSX.Element;
};

export type SelectedFilter = Filter & {
    value: any;
};
