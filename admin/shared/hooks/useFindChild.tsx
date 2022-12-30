import React, { ReactNode, Children, isValidElement } from "react";

export const useFindChild = () => {
    const deepFind = (
        children: ReactNode | ReactNode[],
        findFn: (
            child: ReactNode,
            index?: number,
            children?: ReactNode[]
        ) => boolean
    ): ReactNode | undefined => {
        let found;

        Children.toArray(children).find(
            (child: ReactNode, index: number, findChildren: ReactNode[]) => {
                if (findFn(child, index, findChildren)) {
                    found = child;
                    return true;
                }

                if (isValidElement(child)) {
                    found = deepFind(child.props.children, findFn);
                    return typeof found !== "undefined";
                }

                return false;
            }
        );

        return found;
    };

    return { deepFind };
};
